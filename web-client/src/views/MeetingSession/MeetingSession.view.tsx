import { useCallback, useMemo } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { useRoomToken } from "@/services/queries.ts"
import { LiveKitRoom, VideoConference } from "@livekit/components-react"
import { extractEnvVariables } from "@/utils"
import "@livekit/components-styles"

function useQueryString() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

export const MeetingSession = () => {
  let query = useQueryString()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useRoomToken(
    query.get("roomName") ?? id,
    query.get("identity") ?? "default"
  )
  const { webSocketUrl } = extractEnvVariables()

  const handleOnLeave = () => navigate("/rooms")
  const handleError = useCallback((error: Error) => {
    console.error(error)
    alert(
      `Encountered an unexpected error, check the console logs for details: ${error.message}`
    )
  }, [])

  if (isLoading) {
    return <p>Joining meeting...</p>
  }

  if (isError) {
    return <p>Problem with the meeting token. Please try again later.</p>
  }

  return (
    <LiveKitRoom
      token={data?.accessToken}
      serverUrl={webSocketUrl}
      connect={true}
      onError={handleError}
      onDisconnected={handleOnLeave}
    >
      <VideoConference />
    </LiveKitRoom>
  )
}
