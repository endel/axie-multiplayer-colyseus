import { PlayerState, myPlayer, usePlayersList } from "playroomkit";
import LocalPlayer from "./local-player";
import RemotePlayer from "./remote-player";
import { useMemo } from "react";
import { randomPosition } from "@/utils";

export default function Players() {
  const players: Array<PlayerState> = usePlayersList(true);
  const initialPosition = useMemo(() => randomPosition(), []);

  return (
    <group name="players">
      {players.map((player) => (
        <>
          {player.id === myPlayer().id ? (
            <LocalPlayer position={initialPosition} key={player.id} />
          ) : (
            <RemotePlayer
              key={player.id}
              axie={player.getState("axie")}
              animation={player.getState("animation")}
              position={player.getState("position")}
              rotation={player.getState("rotation")}
            />
          )}
        </>
      ))}
    </group>
  );
}
