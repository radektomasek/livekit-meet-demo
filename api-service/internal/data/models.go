package data

import "errors"

var (
	ErrRecordNotFound = errors.New("record not found")
)

type Models struct {
	Room RoomModel
	Auth AuthModel
}

func NewModels() Models {
	return Models{
		Room: RoomModel{},
		Auth: AuthModel{},
	}
}
