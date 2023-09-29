import { myPlayer } from "playroomkit";

export default function SwitchAxie() {
  const me = myPlayer();

  return (
    <div className="absolute z-10 left-[50%] translate-x-[-50%] bottom-6 p-2 rounded-2xl bg-black space-x-2">
      <button
        className="p-2 rounded-xl bg-red-300"
        onClick={() => me.setState("axie", "buba")}
      >
        Buba
      </button>
      <button
        className="p-2 rounded-xl bg-red-300"
        onClick={() => me.setState("axie", "pomodoro")}
      >
        Pomodoro
      </button>
      <button
        className="p-2 rounded-xl bg-red-300"
        onClick={() => me.setState("axie", "puffy")}
      >
        Puffy
      </button>
    </div>
  );
}
