package data

import "errors"

var (
	ErrRecordNotFound = errors.New("record not found")
)

type Models struct{}

func NewModels() Models {
	return Models{}
}
