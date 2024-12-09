package main

import (
	"errors"
	"github.com/livekit/protocol/auth"
	"github.com/radektomasek/livekit-meet-demo/internal/data"
	"net/http"
	"time"
)

func (app *application) getJoinToken(w http.ResponseWriter, r *http.Request) {
	roomName := r.URL.Query().Get("roomName")
	if roomName == "" {
		app.badRequestResponse(w, r, errors.New("query string 'roomName' is missing"))
	}

	identity := r.URL.Query().Get("identity")
	if identity == "" {
		app.badRequestResponse(w, r, errors.New("query string 'identity' is missing"))
	}

	at := auth.NewAccessToken(app.config.liveKitApiKey, app.config.liveKitApiSecret)

	grant := &auth.VideoGrant{
		RoomJoin: true,
		Room:     roomName,
	}

	at.SetVideoGrant(grant).
		SetIdentity(identity).
		SetValidFor(time.Hour)

	headers := make(http.Header)
	headers.Set("Location", "/v1/auth/token")

	accessToken, err := at.ToJWT()
	if err != nil {
		app.badRequestResponse(w, r, errors.New("problem of getting a auth token for livekit"))
	}

	err = app.writeJSON(w, http.StatusCreated, envelope{"auth": data.Auth{AccessToken: accessToken}}, headers)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}
