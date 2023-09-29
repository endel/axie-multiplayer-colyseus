import { colyseus } from "use-colyseus";
// import type { MyRoomState } from "../../server/src/rooms/schema/MyRoomState";

export const {
  client,
  connectToColyseus,
  disconnectFromColyseus,
  useColyseusRoom,
  useColyseusState,
} = colyseus('ws://localhost:2567', undefined);

//
// Can we provide only "MyRoomState" as type here instead of the concrete implementation?
//
//    = colyseus<MyRoomState>('ws://localhost:2567', undefined);
//