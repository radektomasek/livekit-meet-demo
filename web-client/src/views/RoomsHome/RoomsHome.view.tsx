import { SubmitHandler, useForm } from "react-hook-form"
import { Link, Outlet } from "react-router"
import { useRoomList } from "@/services/queries.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { RoomForm, roomFormSchema } from "@/types/form.schemas.ts"
import { useCreateRoom } from "@/services/mutations.ts"
import "./RoomsHome.css"

export const RoomsHome = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomForm>({
    mode: "all",
    resolver: zodResolver(roomFormSchema),
  })

  const createMutation = useCreateRoom()

  const onSubmit: SubmitHandler<RoomForm> = ({ roomName }) => {
    createMutation.mutate(roomName)
  }

  const { data: rooms, isLoading, isError } = useRoomList()

  if (isLoading) {
    return <p>Loading rooms...</p>
  }

  if (isError) {
    return <p>Error loading room list. Please try again later.</p>
  }

  return (
    <section className="container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>LiveKit Meeting Example</h2>
        </div>
        <form className="new-room" onSubmit={handleSubmit(onSubmit)}>
          <input placeholder={"create a new room"} {...register("roomName")} />
          <input type="submit" />
          {errors.roomName?.message && (
            <p className="error">{errors.roomName?.message}</p>
          )}
        </form>

        <ul className="sidebar-links">
          {(rooms ?? []).length === 0 && <li>No room found.</li>}
          {(rooms ?? []).map((element) => {
            if (element) {
              return (
                <li key={element.id}>
                  <Link to={`/rooms/${element.id}`}>{element.roomName}</Link>
                </li>
              )
            }
          })}
        </ul>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </section>
  )
}
