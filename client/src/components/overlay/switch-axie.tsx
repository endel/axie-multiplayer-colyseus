import { useColyseusRoom, useColyseusState } from "../../net";
import { MouseEvent, useState } from "react";
import { MessageType } from "../../../../server/src/rooms/schema/MyRoomState";

export default function SwitchAxie() {
  const room = useColyseusRoom();

  // @ts-ignore
  const me = useColyseusState((state) => state.players.get(room.sessionId));
  const [skin, setSkin] = useState(me?.skin);

  const changeAxie = (event: MouseEvent<HTMLButtonElement>) => {
    const axie = event.currentTarget.dataset.skin;
    setSkin(axie);
    room.send(MessageType.CHANGE_SKIN, axie);
  }

  const characters = ["buba", "pomodoro", "puffy"];

  return (
    <div className="absolute z-10 left-[50%] translate-x-[-50%] bottom-6 p-2 rounded-2xl bg-black space-x-2">
      {characters.map((axieSkin) => (
        <button
          key={axieSkin}
          className={`p-2 capitalize rounded-xl bg-${skin === axieSkin ? "blue" : "red"}-300`}
          data-skin={axieSkin}
          onClick={changeAxie}
        >
          {axieSkin}
        </button>
      ))}
    </div>

  );
}
