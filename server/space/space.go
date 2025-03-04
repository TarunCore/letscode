package space

import "context"

type Space struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description,omitempty"`
	Type        string `json:"type"`
}

type CreateSpaceReq struct {
	Name        string `json:"name"`
	Description string `json:"description,omitempty"`
	Type        string `json:"type"`
}
type CreateSpaceRes struct {
	ID      int64  `json:"id"`
	Message string `json:"message"`
}

type GetSpaceDetailsReq struct {
	ID int64 `json:"id"`
}
type GetSpaceDetailsRes struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description,omitempty"`
	Type        string `json:"type"`
}

type Repository interface {
	CreateSpace(c context.Context, space *CreateSpaceReq) (*Space, error)
	GetSpaceDetails(c context.Context, id int64) (*Space, error)
}

type Service interface {
	CreateSpace(c context.Context, req *CreateSpaceReq) (*CreateSpaceRes, error)
	GetSpaceDetails(c context.Context, req *GetSpaceDetailsReq) (*GetSpaceDetailsRes, error)
}
