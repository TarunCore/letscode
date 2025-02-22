package router

import (
	"server/user"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var r *gin.Engine

func InitRouter(userHandler *user.Handler) {
	r = gin.Default()
	// allow all cors
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"PUT", "PATCH", "POST", "GET", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
	r.GET("/auth/users", userHandler.GetAllUsers)
	r.POST("/auth/signup", userHandler.CreateNewAccount)
	r.POST("/auth/signin", userHandler.LoginWithEmailPassword)

}

func StartRouter() {
	r.Run(":8080")
}
