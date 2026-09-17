package helper

import (
	"database/sql"
	"encoding/json"
	"errors"

	"dsa-practice/models"
)

type UserRepository struct {
	DB *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{
		DB: db,
	}
}

func (r *UserRepository) CreateUser(
	name string,
	email string,
	passwordHash string,
	authProvider string,
) (*models.User, error) {

	query := `
		INSERT INTO users (
			name,
			email,
			password_hash,
			auth_provider
		)
		VALUES ($1, $2, $3, $4)
		RETURNING
			id,
			name,
			email,
			password_hash,
			google_id,
			profile_image,
			auth_provider,
			total_xp,
			weekly_xp,
			streak_days,
			league,
			weekly_goals,
			badges,
			activity,
			is_active,
			created_at,
			updated_at
	`

	user := &models.User{}

	var weeklyGoalsJSON []byte
	var badgesJSON []byte
	var activityJSON []byte

	err := r.DB.QueryRow(
		query,
		name,
		email,
		passwordHash,
		authProvider,
	).Scan(
		&user.ID,
		&user.Name,
		&user.Email,
		&user.PasswordHash,
		&user.GoogleID,
		&user.ProfileImage,
		&user.AuthProvider,
		&user.TotalXP,
		&user.WeeklyXP,
		&user.StreakDays,
		&user.League,
		&weeklyGoalsJSON,
		&badgesJSON,
		&activityJSON,
		&user.IsActive,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	if err := json.Unmarshal(weeklyGoalsJSON, &user.WeeklyGoals); err != nil {
		return nil, err
	}

	if err := json.Unmarshal(badgesJSON, &user.Badges); err != nil {
		return nil, err
	}

	if err := json.Unmarshal(activityJSON, &user.Activity); err != nil {
		return nil, err
	}

	return user, nil
}

func (r *UserRepository) FindByEmail(
	email string,
) (*models.User, error) {

	query := `
		SELECT
			id,
			name,
			email,
			password_hash,
			google_id,
			profile_image,
			auth_provider,
			total_xp,
			weekly_xp,
			streak_days,
			league,
			weekly_goals,
			badges,
			activity,
			is_active,
			created_at,
			updated_at
		FROM users
		WHERE email = $1
	`

	user := &models.User{}

	var weeklyGoalsJSON []byte
	var badgesJSON []byte
	var activityJSON []byte

	err := r.DB.QueryRow(
		query,
		email,
	).Scan(
		&user.ID,
		&user.Name,
		&user.Email,
		&user.PasswordHash,
		&user.GoogleID,
		&user.ProfileImage,
		&user.AuthProvider,
		&user.TotalXP,
		&user.WeeklyXP,
		&user.StreakDays,
		&user.League,
		&weeklyGoalsJSON,
		&badgesJSON,
		&activityJSON,
		&user.IsActive,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}

		return nil, err
	}

	if err := json.Unmarshal(weeklyGoalsJSON, &user.WeeklyGoals); err != nil {
		return nil, err
	}

	if err := json.Unmarshal(badgesJSON, &user.Badges); err != nil {
		return nil, err
	}

	if err := json.Unmarshal(activityJSON, &user.Activity); err != nil {
		return nil, err
	}

	return user, nil
}

func (r *UserRepository) FindByID(
	id int,
) (*models.User, error) {

	query := `
		SELECT
			id,
			name,
			email,
			password_hash,
			google_id,
			profile_image,
			auth_provider,
			total_xp,
			weekly_xp,
			streak_days,
			league,
			weekly_goals,
			badges,
			activity,
			is_active,
			created_at,
			updated_at
		FROM users
		WHERE id = $1
	`

	user := &models.User{}

	var weeklyGoalsJSON []byte
	var badgesJSON []byte
	var activityJSON []byte

	err := r.DB.QueryRow(
		query,
		id,
	).Scan(
		&user.ID,
		&user.Name,
		&user.Email,
		&user.PasswordHash,
		&user.GoogleID,
		&user.ProfileImage,
		&user.AuthProvider,
		&user.TotalXP,
		&user.WeeklyXP,
		&user.StreakDays,
		&user.League,
		&weeklyGoalsJSON,
		&badgesJSON,
		&activityJSON,
		&user.IsActive,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}

		return nil, err
	}

	if err := json.Unmarshal(weeklyGoalsJSON, &user.WeeklyGoals); err != nil {
		return nil, err
	}

	if err := json.Unmarshal(badgesJSON, &user.Badges); err != nil {
		return nil, err
	}

	if err := json.Unmarshal(activityJSON, &user.Activity); err != nil {
		return nil, err
	}

	return user, nil
}

func (r *UserRepository) FindByGoogleID(
	googleID string,
) (*models.User, error) {

	query := `
		SELECT
			id,
			name,
			email,
			password_hash,
			google_id,
			profile_image,
			auth_provider,
			total_xp,
			weekly_xp,
			streak_days,
			league,
			weekly_goals,
			badges,
			activity,
			is_active,
			created_at,
			updated_at
		FROM users
		WHERE google_id = $1
	`

	user := &models.User{}

	var weeklyGoalsJSON []byte
	var badgesJSON []byte
	var activityJSON []byte

	err := r.DB.QueryRow(
		query,
		googleID,
	).Scan(
		&user.ID,
		&user.Name,
		&user.Email,
		&user.PasswordHash,
		&user.GoogleID,
		&user.ProfileImage,
		&user.AuthProvider,
		&user.TotalXP,
		&user.WeeklyXP,
		&user.StreakDays,
		&user.League,
		&weeklyGoalsJSON,
		&badgesJSON,
		&activityJSON,
		&user.IsActive,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}

		return nil, err
	}

	if err := json.Unmarshal(weeklyGoalsJSON, &user.WeeklyGoals); err != nil {
		return nil, err
	}

	if err := json.Unmarshal(badgesJSON, &user.Badges); err != nil {
		return nil, err
	}

	if err := json.Unmarshal(activityJSON, &user.Activity); err != nil {
		return nil, err
	}

	return user, nil
}
