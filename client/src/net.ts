import { colyseus } from "use-colyseus";
import { MyRoomState } from "../../server/src/rooms/schema/MyRoomState";

export const {
  client,
  connectToColyseus,
  disconnectFromColyseus,
  useColyseusRoom,
  useColyseusState,
} = colyseus<MyRoomState>("ws://localhost:2567", undefined);
