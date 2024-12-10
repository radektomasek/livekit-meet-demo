import axios from "axios"
import { roomSchema, tokenSchema, type Room, type Token } from "@/types"
import { extractEnvVariables } from "@/utils"

const { apiBaseUrl } = extractEnvVariables()
const axiosInstance = axios.create({ baseURL: apiBaseUrl })

export const createRoom = async (roomName: string): Promise<Room> => {
  const response = await axiosInstance.post<{ room: Room | null }>(`/rooms`, {
    roomName,
  })

  const result = roomSchema.safeParse(response.data.room)
  if (!result.success) {
    throw new Error("[POST /rooms]: failed to parse the response")
  }

  return result.data
}

export const listRooms = async (): Promise<Room[]> => {
  const response = await axiosInstance.get<{ rooms: Room[] }>(`/rooms`)

  const result = roomSchema.array().safeParse(response.data.rooms ?? [])
  if (!result.success) {
    throw new Error("[GET /rooms]: failed to parse the response")
  }

  return result.data
}

export const getRoomToken = async (
  roomName: string,
  identity: string
): Promise<Token> => {
  const response = await axiosInstance.get<{ auth: Token }>(
    `/rooms/${roomName}/token?identity=${encodeURIComponent(identity)}`
  )

  const result = tokenSchema.safeParse(response.data.auth)
  if (!result.success) {
    throw new Error(
      `[GET /rooms/${roomName}/token]: failed to parse the response`
    )
  }

  return result.data
}
