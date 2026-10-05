package models

import "time"

type User struct {
	ID                  int          `json:"id"`
	Name                string       `json:"name"`
	Email               string       `json:"email"`
	PasswordHash        *string      `json:"-"`
	GoogleID            *string      `json:"-"`
	ProfileImage        *string      `json:"profile_image"`
	AuthProvider        string       `json:"auth_provider"`
	ResetTokenHash      *string      `json:"-"`
	ResetTokenExpiresAt *time.Time   `json:"-"`
	TotalXP             int          `json:"total_xp"`
	WeeklyXP            int          `json:"weekly_xp"`
	StreakDays          int          `json:"streak_days"`
	League              string       `json:"league"`
	WeeklyGoals         []WeeklyGoal `json:"weekly_goals"`
	Badges              interface{}  `json:"badges"`
	Activity            interface{}  `json:"activity"`
	IsActive            bool         `json:"is_active"`
	CreatedAt           time.Time    `json:"created_at"`
	UpdatedAt           time.Time    `json:"updated_at"`
}
type WeeklyGoal struct {
	Goal      string `json:"goal"`
	Target    int    `json:"target"`
	Completed int    `json:"completed"`
}
