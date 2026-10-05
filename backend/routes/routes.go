package routes

import (
	"github.com/gin-gonic/gin"

	handlers "dsa-practice/handler"
	"dsa-practice/middleware"
)

func SetupRoutes(
	router *gin.Engine,
	authHandler *handlers.AuthHandler,
	jwtSecret string,
) {

	api := router.Group("/api")

	auth := api.Group("/auth")

	auth.POST("/register", authHandler.Register)
	auth.POST("/login", authHandler.Login)

	auth.GET("/google", authHandler.GoogleLogin)
	auth.GET("/google/callback", authHandler.GoogleCallback)
	auth.POST("/forgot-password", authHandler.ForgotPassword)
	auth.POST("/reset-password", authHandler.ResetPassword)
	auth.GET(
		"/me",
		middleware.AuthMiddleware(jwtSecret),
		authHandler.Me,
	)
}
