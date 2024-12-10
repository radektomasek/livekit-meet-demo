import { type Room } from "@/types"
import "./RoomCard.css"

type Props = {
  roomDetail: Room | undefined
}

export const RoomCard = ({ roomDetail }: Props) => {
  if (!roomDetail) {
    return null
  }

  const { id, roomName, maxParticipants, creationTime } = roomDetail
  return (
    <div role="presentation" className="card">
      <div className="room-details">
        <h2>Room ID: {id}</h2>
        <ul>
          <li>Room Name: {roomName}</li>
          <li>Max participants: {maxParticipants}</li>
          <li>Creation time: {creationTime}</li>
        </ul>
      </div>
    </div>
  )
}
