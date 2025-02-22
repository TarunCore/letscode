package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	Service
}

func NewHandler(s Service) *Handler {
	return &Handler{
		Service: s,
	}
}

func (h *Handler) CreateNewAccount(c *gin.Context) {
	var userReq CreateUserReq

	if err := c.ShouldBindJSON(&userReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	res, err := h.Service.CreateUser(c.Request.Context(), &userReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error at service level": err.Error()})
		return
	}
	c.JSON(http.StatusOK, res)
}

func (h *Handler) LoginWithEmailPassword(c *gin.Context) {
	var loginReq LoginWithEmailReq

	if err := c.ShouldBindJSON(&loginReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	res, err := h.Service.LoginWithEmailPassword(c.Request.Context(), &loginReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error at service level": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}

func (h *Handler) GetAllUsers(c *gin.Context) {
	res, err := h.Service.GetAllUsers(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error at service level": err.Error()})
		return
	}
	c.JSON(http.StatusOK, res)
}
