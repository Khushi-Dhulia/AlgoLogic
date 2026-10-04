package handlers

import (
	"net/http"
	"net/url"
	"os"

	"github.com/gin-gonic/gin"

	"dsa-practice/models"
	"dsa-practice/services"
)

type AuthHandler struct {
	AuthService *services.AuthService
}

func NewAuthHandler(
	authService *services.AuthService,
) *AuthHandler {
	return &AuthHandler{
		AuthService: authService,
	}
}

// Register handles email/password registration
func (h *AuthHandler) Register(c *gin.Context) {

	var request models.RegisterRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid registration data",
		})
		return
	}

	user, token, err := h.AuthService.Register(request)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "registration successful",
		"user":    user,
		"token":   token,
	})
}

// Login handles email/password login
func (h *AuthHandler) Login(c *gin.Context) {

	var request models.LoginRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid login data",
		})
		return
	}

	user, token, err := h.AuthService.Login(request)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "login successful",
		"user":    user,
		"token":   token,
	})
}

// Me returns the currently authenticated user
func (h *AuthHandler) Me(c *gin.Context) {

	userIDValue, exists := c.Get("user_id")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "unauthorized",
		})
		return
	}

	userID, ok := userIDValue.(*int)

	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "invalid user",
		})
		return
	}

	user, err := h.AuthService.GetUserByID(userID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to get user",
		})
		return
	}

	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "user not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}

// GoogleLogin redirects the user to Google OAuth
func (h *AuthHandler) GoogleLogin(c *gin.Context) {

	authURL := h.AuthService.GetGoogleAuthURL()

	c.Redirect(
		http.StatusTemporaryRedirect,
		authURL,
	)
}

// GoogleCallback handles Google's OAuth callback
func (h *AuthHandler) GoogleCallback(c *gin.Context) {

	code := c.Query("code")

	if code == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Google authorization code is missing",
		})
		return
	}

	user, token, err := h.AuthService.GoogleLogin(code)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Redirect to Next.js frontend with JWT
	frontendURL := os.Getenv("FrontendURL")

	c.Redirect(
		http.StatusTemporaryRedirect,
		frontendURL+"/auth/google/callback?token="+url.QueryEscape(token),
	)

	// user is returned by GoogleLogin but isn't needed for redirect.
	_ = user
}
