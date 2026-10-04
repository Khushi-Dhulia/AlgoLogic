package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"dsa-practice/config"
	"dsa-practice/database"
	handlers "dsa-practice/handler"
	"dsa-practice/helper"
	"dsa-practice/routes"
	"dsa-practice/services"
)

func main() {

	cfg := config.Load()

	db, err := database.Connect(cfg.DatabaseURL)
	if err != nil {
		log.Fatal("database connection failed:", err)
	}

	defer db.Close()

	userRepository := helper.NewUserRepository(db)

	authService := services.NewAuthService(
		userRepository,
		cfg.JWTSecret,
		cfg.GoogleClientID,
		cfg.GoogleClientSecret,
		cfg.GoogleRedirectURL,
	)

	authHandler := handlers.NewAuthHandler(
		authService,
	)

	router := gin.Default()

	// CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	routes.SetupRoutes(
		router,
		authHandler,
		cfg.JWTSecret,
	)

	log.Println("AlgoLogic backend running on port", cfg.Port)

	err = router.Run(":" + cfg.Port)
	if err != nil {
		log.Fatal(err)
	}
}
