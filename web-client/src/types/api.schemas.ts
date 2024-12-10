import { z } from "zod"

export const roomSchema = z.object({
  id: z.string(),
  roomName: z.string(),
  creationTime: z.number(),
  maxParticipants: z.number()
})

export const tokenSchema = z.object({
  accessToken: z.string()
})

export type Room = z.infer<typeof roomSchema>
export type Token = z.infer<typeof tokenSchema>