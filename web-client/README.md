# LiveKit Meet Demo (Web Client)

This section explains the frontend part of the LiveKit Meet project in more detail.

## Project Structure

The project is set up in a relatively simple way. Most of the boilerplate code was generated using the **Vite** + React/TypeScript template.

The core logic resides in the `src` directory, organized as follows:

- **/routes** - Contains the basic routing for the **Rooms Home**, **Room Detail** and **Meeting Session** pages.
- **/services** - Implements the API endpoints and handles **TanStack Query** mutations and queries.
- **/types** - Contains **Zod** schema definitions for data validation.
- **/views** - Houses the implementation of the Rooms Home Page, Rooms Detail Page, and Meeting Session.
- **main.tsx** - The entry point for the application.

## Running the App Locally

To set up and run the app locally, follow the guidelines below.

### Environment Variables

The frontend requires two environment variables:

- `VITE_API_BASE_URL`: The base URL of the backend API. For local development, this should be set to `http://localhost:4000` or the production `https://api.digitalfun.space/v1`.
- `VITE_LIVEKIT_WEBSOCKET_URL`: The client-side websocket URL provided by **LiveKit**. Register an account at [LiveKit](https://livekit.io) to get one.

> **Note**: The **VITE** prefix is required by the **Vite** bundler to recognize these environment variables.

### Running the App

1. Clone the repository to your local machine.
2. Install dependencies by running `npm install` from the project root.
3. Make sure your environment variables are correctly set in the `.env` file.
4. Start the development server with `npm run dev`.

## Conclusion

This **web-client** app is a modern **React** app built using **Vite** for fast builds and hot-reloading during development. After setting up the environment variables and installing dependencies, the app should run seamlessly on your local machine.