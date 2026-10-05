package helper

import (
	"database/sql"
	"dsa-practice/models"
	"encoding/json"
	"errors"
	"time"
)

func (r *UserRepository) CreateGoogleUser(
	name string,
	email string,
	googleID string,
	profileImage string,
) (*models.User, error) {

	query := `
		INSERT INTO users (
			name,
			email,
			google_id,
			profile_image,
			auth_provider
		)
		VALUES ($1, $2, $3, $4, 'google')
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

	var user models.User

	var weeklyGoalsJSON []byte
	var badgesJSON []byte
	var activityJSON []byte

	err := r.DB.QueryRow(
		query,
		name,
		email,
		googleID,
		profileImage,
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

	if len(weeklyGoalsJSON) > 0 {
		if err := json.Unmarshal(
			weeklyGoalsJSON,
			&user.WeeklyGoals,
		); err != nil {
			return nil, err
		}
	}

	if len(badgesJSON) > 0 {
		if err := json.Unmarshal(
			badgesJSON,
			&user.Badges,
		); err != nil {
			return nil, err
		}
	}

	if len(activityJSON) > 0 {
		if err := json.Unmarshal(
			activityJSON,
			&user.Activity,
		); err != nil {
			return nil, err
		}
	}

	return &user, nil
}

// SaveResetToken stores the hashed reset token and its expiry time.
func (r *UserRepository) SaveResetToken(
	email string,
	tokenHash string,
	expiresAt time.Time,
) error {
	query := `
		UPDATE users
		SET
			reset_token_hash = $1,
			reset_token_expires_at = $2,
			updated_at = NOW()
		WHERE email = $3
	`

	_, err := r.DB.Exec(
		query,
		tokenHash,
		expiresAt,
		email,
	)

	return err
}

// FindByResetTokenHash finds a user using the hashed reset token.
func (r *UserRepository) FindByResetTokenHash(
	tokenHash string,
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
		WHERE reset_token_hash = $1
		  AND reset_token_expires_at > NOW()
	`

	user := &models.User{}

	var weeklyGoalsJSON []byte
	var badgesJSON []byte
	var activityJSON []byte

	err := r.DB.QueryRow(
		query,
		tokenHash,
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

	if len(weeklyGoalsJSON) > 0 {
		if err := json.Unmarshal(
			weeklyGoalsJSON,
			&user.WeeklyGoals,
		); err != nil {
			return nil, err
		}
	}

	if len(badgesJSON) > 0 {
		if err := json.Unmarshal(
			badgesJSON,
			&user.Badges,
		); err != nil {
			return nil, err
		}
	}

	if len(activityJSON) > 0 {
		if err := json.Unmarshal(
			activityJSON,
			&user.Activity,
		); err != nil {
			return nil, err
		}
	}

	return user, nil
}

// UpdatePassword updates the user's password and clears the reset token.
func (r *UserRepository) UpdatePassword(
	userID int,
	passwordHash string,
) error {
	query := `
		UPDATE users
		SET
			password_hash = $1,
			reset_token_hash = NULL,
			reset_token_expires_at = NULL,
			updated_at = NOW()
		WHERE id = $2
	`

	_, err := r.DB.Exec(
		query,
		passwordHash,
		userID,
	)

	return err
}
