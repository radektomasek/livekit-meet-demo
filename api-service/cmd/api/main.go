package main

import (
	"flag"
	"fmt"
	"github.com/joho/godotenv"
	lksdk "github.com/livekit/server-sdk-go/v2"
	"github.com/radektomasek/livekit-meet-demo/internal/data"
	"log"
	"log/slog"
	"net/http"
	"os"
	"time"
)

const version = "1.0.0"

type config struct {
	port             int
	env              string
	liveKitHostUrl   string
	liveKitApiKey    string
	liveKitApiSecret string
}

type application struct {
	config            config
	logger            *slog.Logger
	models            data.Models
	liveKitRoomClient *lksdk.RoomServiceClient
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	liveKitHostUrl := os.Getenv("LIVEKIT_URL")
	liveKitApiKey := os.Getenv("LIVEKIT_API_KEY")
	liveKitApiSecret := os.Getenv("LIVEKIT_API_SECRET")

	var cfg config

	flag.IntVar(&cfg.port, "port", 4000, "API server port")
	flag.StringVar(&cfg.env, "env", "development", "Environment (development|production)")
	flag.Parse()

	cfg.liveKitHostUrl = liveKitHostUrl
	cfg.liveKitApiKey = liveKitApiKey
	cfg.liveKitApiSecret = liveKitApiSecret

	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))

	roomServiceClient := lksdk.NewRoomServiceClient(liveKitHostUrl, liveKitApiKey, liveKitApiSecret)

	app := &application{
		config:            cfg,
		logger:            logger,
		models:            data.NewModels(),
		liveKitRoomClient: roomServiceClient,
	}

	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.port),
		Handler:      app.routes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		ErrorLog:     slog.NewLogLogger(logger.Handler(), slog.LevelError),
	}

	logger.Info("starting server", "addr", server.Addr, "env", cfg.env)

	err = server.ListenAndServe()
	logger.Error(err.Error())
	os.Exit(1)
}
