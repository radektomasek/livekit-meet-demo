package data

type Room struct {
	Id              string `json:"id"`
	Name            string `json:"roomName"`
	CreationTime    int64  `json:"creationTime"`
	MaxParticipants uint32 `json:"maxParticipants"`
}

type RoomModel struct{}
