import { useMemo } from "react";
import LocalPlayer from "./local-player";
import RemotePlayer from "./remote-player";

import { randomPosition } from "../../utils";
import { useColyseusRoom, useColyseusState } from "../../net";

export default function Players() {
  const room = useColyseusRoom();

  const players = useColyseusState((state) => state.players);

  const initialPosition = useMemo(() => randomPosition(), []);

  return (
    <group name="players">
      {Array.from(players.keys()).map((sessionId) =>
        sessionId === room.sessionId ? (
          <LocalPlayer key={sessionId} position={initialPosition} />
        ) : (
          <RemotePlayer key={sessionId} player={players.get(sessionId)} />
        )
      )}
    </group>
  );
}
