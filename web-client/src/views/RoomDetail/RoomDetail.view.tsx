import { useNavigate, useParams } from "react-router"
import { RoomCard } from "@/components"
import { useRoomList } from "@/services/queries.ts"
import { SubmitHandler, useForm } from "react-hook-form"
import { RoomJoin, roomJoinSchema } from "@/types/form.schemas.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import "./RoomDetail.css"

export const RoomDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data: rooms, isLoading } = useRoomList()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomJoin>({
    mode: "all",
    resolver: zodResolver(roomJoinSchema),
  })

  const navigate = useNavigate()

  const roomDetail = (rooms ?? []).find((element) => element.id === id)

  const onSubmit: SubmitHandler<RoomJoin> = ({ identity }) => {
    navigate(
      `/meeting/${id}/session?identity=${encodeURIComponent(identity)}&roomName=${roomDetail?.roomName}`
    )
  }

  return (
    <section className="detail">
      <div className="frame">
        {isLoading && <p>Loading rooms...</p>}
        {!isLoading && !roomDetail && <p>The room doesn't exist.</p>}
        {roomDetail && <RoomCard roomDetail={roomDetail} />}
      </div>
      {roomDetail && (
        <div className="frame">
          <h2>Join the meeting</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="identity-field"
              placeholder={"type your name"}
              {...register("identity")}
            />
            <input type="submit" name="Join the meeting" />
            {errors.identity?.message && (
              <p className="error">{errors.identity?.message}</p>
            )}
          </form>
        </div>
      )}
    </section>
  )
}
