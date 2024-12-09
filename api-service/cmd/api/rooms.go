package main

import (
	"context"
	"github.com/livekit/protocol/livekit"
	"github.com/radektomasek/livekit-meet-demo/internal/data"
	"net/http"
)

func (app *application) createRoom(w http.ResponseWriter, r *http.Request) {
	var input struct {
		RoomName string `json:"roomName"`
	}

	err := app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	response, err := app.liveKitRoomClient.CreateRoom(context.Background(), &livekit.CreateRoomRequest{
		Name: input.RoomName,
	})

	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	createdRoom := &data.Room{Id: response.Sid, Name: response.Name, CreationTime: response.CreationTime}
	headers := make(http.Header)
	headers.Set("Location", "/v1/room")

	err = app.writeJSON(w, http.StatusCreated, envelope{"room": createdRoom}, headers)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) listRooms(w http.ResponseWriter, r *http.Request) {
	response, err := app.liveKitRoomClient.ListRooms(context.Background(), &livekit.ListRoomsRequest{})

	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	var rooms []data.Room

	for _, room := range response.Rooms {
		rooms = append(rooms, data.Room{Id: room.Sid, Name: room.Name, CreationTime: room.CreationTime})
	}

	headers := make(http.Header)
	headers.Set("Location", "/v1/room")

	err = app.writeJSON(w, http.StatusOK, envelope{"rooms": rooms}, headers)
}
