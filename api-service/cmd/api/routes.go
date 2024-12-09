package main

import (
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
	"net/http"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/v1/healthcheck", app.healthCheckHandler)
	router.HandlerFunc(http.MethodPost, "/v1/rooms", app.createRoom)
	router.HandlerFunc(http.MethodGet, "/v1/rooms", app.listRooms)
	router.HandlerFunc(http.MethodGet, "/v1/rooms/:roomName/token", app.getJoinToken)

	return app.recoverPanic(cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173", "https://meet.digitalfun.space"},
		AllowedMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
	}).Handler(router))
}
