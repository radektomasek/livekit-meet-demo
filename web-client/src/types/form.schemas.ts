import { z } from "zod"

export const roomFormSchema = z.object({
  roomName: z.string().min(1, { message: "The field is required" }),
})

export const roomJoinSchema = z.object({
  identity: z.string().min(1, { message: "The field is required" }),
})

export type RoomForm = z.infer<typeof roomFormSchema>
export type RoomJoin = z.infer<typeof roomJoinSchema>
