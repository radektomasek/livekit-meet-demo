import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createRoom } from "@/services/api.ts"
import { Room } from "@/types"

export const useCreateRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createRoom,
    onSuccess: (data) => {
      queryClient.setQueryData(["rooms"], (oldData: Room[]) =>
        oldData ? [...oldData, data] : oldData
      )
    },
  })
}
