import { createBrowserRouter, Navigate } from "react-router"
import { RoomDetail, MeetingSession, RoomsHome, InvalidUrl } from "@/views"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/rooms"} />,
  },
  {
    path: "/rooms",
    element: <RoomsHome />,
    children: [
      {
        path: "/rooms/:id",
        element: <RoomDetail />,
      },
    ],
  },
  {
    path: "/meeting/:id/session",
    element: <MeetingSession />,
  },
  {
    path: "*",
    element: <InvalidUrl />,
  },
])
