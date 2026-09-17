package services

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"dsa-practice/helper"
	"dsa-practice/models"
	"dsa-practice/utils"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type AuthService struct {
	UserRepository     *helper.UserRepository
	JWTSecret          string
	GoogleClientID     string
	GoogleClientSecret string
	GoogleRedirectURL  string
}

func NewAuthService(
	userRepository *helper.UserRepository,
	jwtSecret string,
	googleClientID string,
	googleClientSecret string,
	googleRedirectURL string,
) *AuthService {
	return &AuthService{
		UserRepository:     userRepository,
		JWTSecret:          jwtSecret,
		GoogleClientID:     googleClientID,
		GoogleClientSecret: googleClientSecret,
		GoogleRedirectURL:  googleRedirectURL,
	}
}

func (s *AuthService) Register(
	request models.RegisterRequest,
) (*models.User, string, error) {

	name := strings.TrimSpace(request.Name)
	email := strings.ToLower(strings.TrimSpace(request.Email))

	if name == "" {
		return nil, "", errors.New("name is required")
	}

	if email == "" {
		return nil, "", errors.New("email is required")
	}

	if len(request.Password) < 8 {
		return nil, "", errors.New(
			"password must be at least 8 characters",
		)
	}

	existingUser, err := s.UserRepository.FindByEmail(email)
	if err != nil {
		return nil, "", err
	}

	if existingUser != nil {
		return nil, "", errors.New(
			"email is already registered",
		)
	}

	passwordHash, err := utils.HashPassword(request.Password)
	if err != nil {
		return nil, "", err
	}

	user, err := s.UserRepository.CreateUser(
		name,
		email,
		passwordHash,
		"email",
	)
	if err != nil {
		return nil, "", err
	}

	token, err := utils.GenerateToken(
		user.ID,
		s.JWTSecret,
	)
	if err != nil {
		return nil, "", err
	}

	return user, token, nil
}

func (s *AuthService) Login(
	request models.LoginRequest,
) (*models.User, string, error) {

	email := strings.ToLower(strings.TrimSpace(request.Email))

	user, err := s.UserRepository.FindByEmail(email)
	if err != nil {
		return nil, "", err
	}

	if user == nil {
		return nil, "", errors.New(
			"invalid email or password",
		)
	}

	if !user.IsActive {
		return nil, "", errors.New(
			"account is inactive",
		)
	}

	if user.PasswordHash == nil {
		return nil, "", errors.New(
			"this account uses Google login",
		)
	}

	if !utils.CheckPassword(
		request.Password,
		*user.PasswordHash,
	) {
		return nil, "", errors.New(
			"invalid email or password",
		)
	}

	token, err := utils.GenerateToken(
		user.ID,
		s.JWTSecret,
	)
	if err != nil {
		return nil, "", err
	}

	return user, token, nil
}

func (s *AuthService) GetUserByID(
	userID *int,
) (*models.User, error) {

	if userID == nil {
		return nil, errors.New("invalid user id")
	}

	return s.UserRepository.FindByID(*userID)
}

func (s *AuthService) GetGoogleAuthURL() string {

	config := &oauth2.Config{
		ClientID:     s.GoogleClientID,
		ClientSecret: s.GoogleClientSecret,
		RedirectURL:  s.GoogleRedirectURL,
		Scopes: []string{
			"openid",
			"email",
			"profile",
		},
		Endpoint: google.Endpoint,
	}

	return config.AuthCodeURL("state")
}

func (s *AuthService) GoogleLogin(
	code string,
) (*models.User, string, error) {

	config := &oauth2.Config{
		ClientID:     s.GoogleClientID,
		ClientSecret: s.GoogleClientSecret,
		RedirectURL:  s.GoogleRedirectURL,
		Scopes: []string{
			"openid",
			"email",
			"profile",
		},
		Endpoint: google.Endpoint,
	}

	ctx := context.Background()

	// Exchange Google authorization code for token
	token, err := config.Exchange(ctx, code)
	if err != nil {
		return nil, "", fmt.Errorf(
			"failed to exchange Google authorization code: %w",
			err,
		)
	}

	// Get Google user information
	client := config.Client(ctx, token)

	response, err := client.Get(
		"https://www.googleapis.com/oauth2/v2/userinfo",
	)
	if err != nil {
		return nil, "", fmt.Errorf(
			"failed to get Google user information: %w",
			err,
		)
	}

	defer response.Body.Close()

	var googleUser struct {
		ID      string `json:"id"`
		Email   string `json:"email"`
		Name    string `json:"name"`
		Picture string `json:"picture"`
	}

	if err := json.NewDecoder(response.Body).Decode(&googleUser); err != nil {
		return nil, "", fmt.Errorf(
			"failed to decode Google user information: %w",
			err,
		)
	}

	if googleUser.ID == "" || googleUser.Email == "" {
		return nil, "", errors.New(
			"invalid Google account information",
		)
	}

	email := strings.ToLower(
		strings.TrimSpace(googleUser.Email),
	)

	// First check whether this Google account already exists.
	user, err := s.UserRepository.FindByGoogleID(googleUser.ID)
	if err != nil {
		return nil, "", err
	}

	// If Google account does not exist, check email.
	if user == nil {

		user, err = s.UserRepository.FindByEmail(email)
		if err != nil {
			return nil, "", err
		}

		// Existing email account.
		if user != nil {
			return nil, "", errors.New(
				"an account already exists with this email; please login using email and password",
			)
		}

		// Create a new Google account.
		user, err = s.UserRepository.CreateGoogleUser(
			googleUser.Name,
			email,
			googleUser.ID,
			googleUser.Picture,
		)
		if err != nil {
			return nil, "", err
		}
	}

	if !user.IsActive {
		return nil, "", errors.New("account is inactive")
	}

	jwtToken, err := utils.GenerateToken(
		user.ID,
		s.JWTSecret,
	)
	if err != nil {
		return nil, "", err
	}

	return user, jwtToken, nil
}
