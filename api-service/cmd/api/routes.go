package main

import (
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
	"net/http"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/v1/healthcheck", app.healthCheckHandler)
	router.HandlerFunc(http.MethodGet, "/v1/auth/token", app.getJoinToken)
	router.HandlerFunc(http.MethodPost, "/v1/room", app.createRoom)
	router.HandlerFunc(http.MethodGet, "/v1/room", app.listRooms)

	return app.recoverPanic(cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173", "https://meet.digitalfun.space"},
		AllowedMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
	}).Handler(router))
}
