package main

import (
	"fmt"
	"log"
	"server/db"
	"server/router"
	"server/user"
)

func main() {
	dbConn, err := db.NewDatabase()
	if err != nil {
		log.Fatalf("Could not initialize connection %s", err)
	}

	userRepository := user.NewRepository(dbConn.GetDB())
	userService := user.NewService(userRepository)
	userHandler := user.NewHandler(userService)
	if userHandler == nil {
		fmt.Println("userHandler is nil")
	}
	router.InitRouter(userHandler)
	router.StartRouter()

	fmt.Println("Hello world")
}
