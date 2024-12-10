# LiveKit Meet Demo (API Service)

This section explains the backend part of the LiveKit Meet project in more detail.

## Available endpoints

- **GET /v1/healthcheck**: This is a simple healthcheck endpoints to verify whether the service is running successfully.
- **GET /v1/rooms**: Endpoint for listing available rooms.
- **POST /v1/rooms**: Endpoint for creating a new room. The parameter **roomName** is required.
- **GET /v1/rooms/:roomName/token**: Endpoint for getting the token related to the specific `roomName`, an extra `identity` query string containing the participant name is expected.

## Project Structure

The project is organized in a simple, straightforward manner. Unlike the frontend, no boilerplate generation was used—everything was built from scratch.

The core logic resides in the `cmd/api` and `internal/data` directories, organized as follows:

### cmd/api

  - **auth.go**: Implementation of the route handler of the token fetching.
  - **errors.go**: Implementation of various error checks.
  - **healthcheck.go**: Route Handler for the basic healthcheck endpoint.
  - **main.go**: The root file of the api.
  - **middlewares.go**: Implementation of custom middlewares, handling the panic recovery.
  - **rooms.go**: Implementation of route handlers for the creation and listing of the rooms.
  - **routes.go**: The route definitions of the endpoints.

### internal/data

  - **auth.go**: Model definitions of the auth (token related) data
  - **rooms.go**: Model definitions of the rooms related data
  - **models.go**: Wrapper connecting two previous models under single structure.

## Running the App Locally

To set up and run the app locally, follow the guidelines below.

### Environment Variables

The backend requires three environment variables:

- `LIVEKIT_API_KEY`: LiveKit API Key.
- `LIVEKIT_API_SECRET`: LiveKit API Secret.
- `LIVEKIT_URL`: an HTTPS equivalent of the Websocket URL provided by LiveKit.

### Running the App

1. Clone the repository to your local machine.
2. Install dependencies by running `go mod download` from the project root.
3. Make sure your environment variables are correctly set in the `.env` file.
4. Start the development server with `go run ./cmd/api`.

## Conclusion

This **api-service** app is a simple **Golang** using the **LiveKit Go SDK**. After setting up the environment variables and installing dependencies, the api should run seamlessly on your local machine.

