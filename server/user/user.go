package user

import "context"

type User struct {
	ID       int64  `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type CreateUserReq struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// https://www.youtube.com/watch?v=rcH813f5vCE
type CreateUserRes struct {
	ID       int64  `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

type LoginWithEmailReq struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
type LoginWithEmailRes struct {
	accessToken string
	ID          string `json:"id"` //TODO: why string
	Username    string `json:"username"`
}

type Repository interface {
	CreateUser(c context.Context, user *User) (*User, error)
	GetUserByMail(c context.Context, email string) (*User, error)
	GetAllUserData(c context.Context) (*[]CreateUserRes, error)
}

type Service interface {
	CreateUser(c context.Context, req *CreateUserReq) (*CreateUserRes, error)
	LoginWithEmailPassword(c context.Context, req *LoginWithEmailReq) (*LoginWithEmailRes, error)
	GetAllUsers(c context.Context) (*[]CreateUserRes, error)
}
