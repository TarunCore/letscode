package user

import (
	"context"
	"database/sql"
)

type DBTX interface {
	ExecContext(ctx context.Context, query string, args ...interface{}) (sql.Result, error)
	// TODO
	QueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)
	QueryRowContext(context.Context, string, ...interface{}) *sql.Row
}

type repository struct {
	db DBTX
}

func NewRepository(db DBTX) Repository { // see the return type carefully
	return &repository{db: db}
}

func (r *repository) CreateUser(ctx context.Context, user *User) (*User, error) {
	var lastInsertId int
	query := "INSERT INTO users(username, email, password) VALUES ($1, $2, $3) returning id"
	err := r.db.QueryRowContext(ctx, query, user.Username, user.Email, user.Password).Scan(&lastInsertId)
	if err != nil {
		return &User{}, err
	}
	user.ID = int64(lastInsertId)
	return user, nil
}

func (r *repository) GetUserByMail(ctx context.Context, email string) (*User, error) {
	var user User
	query := "SELECT email, password, username FROM users where email=$1"
	err := r.db.QueryRowContext(ctx, query, email).Scan(&user.Email, &user.Password, &user.Username)
	if err != nil {
		return &User{}, err
	}
	return &user, nil
}

func (r *repository) GetAllUserData(ctx context.Context) (*[]CreateUserRes, error) {
	var data []CreateUserRes
	query := "SELECT id, username, email from users"
	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return &data, err
	}
	defer rows.Close()
	for rows.Next() {
		var user CreateUserRes
		err := rows.Scan(&user.ID, &user.Username, &user.Email)
		if err != nil {
			return &data, err
		}
		data = append(data, user)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return &data, nil
}
