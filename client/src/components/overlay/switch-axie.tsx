import { useColyseusRoom, useColyseusState } from "../../net";
import { MouseEvent } from "react";
import { MessageType } from "../../../../server/src/rooms/schema/MyRoomState";

export default function SwitchAxie() {
  const room = useColyseusRoom();

  // // @ts-ignore
  // const me = useColyseusState((state) => state.players.get(room.sessionId))

  const changeAxie = (event: MouseEvent<HTMLButtonElement>) => {
    const axie = event.currentTarget.dataset.skin;
    console.log("change skin:", axie);
    room.send(MessageType.CHANGE_SKIN, axie);
  }

  return (
    <div className="absolute z-10 left-[50%] translate-x-[-50%] bottom-6 p-2 rounded-2xl bg-black space-x-2">
      <button
        className="p-2 rounded-xl bg-red-300"
        data-skin="buba"
        onClick={changeAxie}
      >
        Buba
      </button>
      <button
        className="p-2 rounded-xl bg-red-300"
        data-skin="pomodoro"
        onClick={changeAxie}
      >
        Pomodoro
      </button>
      <button
        className="p-2 rounded-xl bg-red-300"
        data-skin="puffy"
        onClick={changeAxie}
      >
        Puffy
      </button>
    </div>
  );
}
