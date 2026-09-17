package helper

import (
	"dsa-practice/models"
	"encoding/json"
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
