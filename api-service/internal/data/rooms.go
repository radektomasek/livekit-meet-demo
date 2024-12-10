package data

type Room struct {
	Id              string `json:"id,omitempty"`
	Name            string `json:"roomName"`
	CreationTime    int64  `json:"creationTime,omitempty"`
	MaxParticipants uint32 `json:"maxParticipants,omitempty"`
}

type RoomModel struct{}
