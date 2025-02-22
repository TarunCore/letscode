package user

import (
	"context"
	"server/util"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

const (
	secretKey = "secret"
)

type service struct {
	Repository
	timeout time.Duration
}

func NewService(repository Repository) *service {

	return &service{
		Repository: repository,
		timeout:    time.Duration(2) * time.Second,
	}
}

func (s *service) CreateUser(ctx context.Context, req *CreateUserReq) (*CreateUserRes, error) {
	hashedPassword, err := util.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}
	u := &User{
		Username: req.Username,
		Email:    req.Email,
		Password: hashedPassword,
	}
	r, err := s.Repository.CreateUser(ctx, u) // when CreateUser is not implemented in repo, no error is shown
	if err != nil {
		return &CreateUserRes{}, err
	}

	res := &CreateUserRes{
		ID:       r.ID,
		Username: r.Username,
		Email:    r.Email,
	}

	return res, nil
}

type MyJWTClaims struct { // check what happens without decoding
	ID       string `json:"id"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}

func (s *service) LoginWithEmailPassword(ctx context.Context, req *LoginWithEmailReq) (*LoginWithEmailRes, error) {

	user, err := s.Repository.GetUserByMail(ctx, req.Email)
	if err != nil {
		return &LoginWithEmailRes{}, err
	}

	err = util.CheckPassword(req.Password, user.Password)

	if err != nil {
		return &LoginWithEmailRes{}, err
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, MyJWTClaims{
		ID:       strconv.Itoa(int(user.ID)),
		Username: user.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    "tarun", //TODO
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
		},
	})

	ss, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return &LoginWithEmailRes{}, err
	}

	return &LoginWithEmailRes{accessToken: ss, Username: user.Username, ID: strconv.Itoa(int(user.ID))}, nil
}

func (s *service) GetAllUsers(ctx context.Context) (*[]CreateUserRes, error) {
	data, err := s.Repository.GetAllUserData(ctx)
	if err != nil {
		return data, err
	}
	return data, nil
}
