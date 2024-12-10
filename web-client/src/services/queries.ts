import { useQuery } from "@tanstack/react-query"
import { getRoomToken, listRooms } from "@/services/api.ts"

export function useRoomList() {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: listRooms,
  })
}

export function useRoomToken(roomName?: string, identity?: string) {
  return useQuery({
    queryKey: ["auth"],
    queryFn: () => {
      if (!roomName) {
        throw new ReferenceError(`[useRoomToken]: Missing 'roomName' parameter`)
      }

      if (!identity) {
        throw new ReferenceError(`[useRoomToken]: Missing 'identity' parameter`)
      }

      return getRoomToken(roomName, identity)
    },
    enabled: !!roomName && !!identity,
  })
}
