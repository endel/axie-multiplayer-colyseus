import SwitchAxie from "../components/overlay/switch-axie";
import Scene from "../components/scene";

import { connectToColyseus, disconnectFromColyseus } from "../net";
import { useEffect, useState } from "react";

export default function Home() {
  const [isJoined, setIsJoined] = useState(false);

  // Connect to server
  useEffect(() => {
    (async () => {
      await connectToColyseus("my_room");
      setIsJoined(true);
    })();

    return () => { disconnectFromColyseus(); };
  }, []);

  return (
    <main className={"relative w-screen h-screen bg-slate-100" + (!isJoined ? "cursor-wait" : "")}>
      {/* Loading message */}
      {!isJoined &&
        <div className="text-white absolute left-0 right-0 top-0 bottom-0 m-auto w-64 h-64">
          <h2 className="text-2xl pb-6 font-semibold">Loading...</h2>
        </div>}

      {isJoined && (
        <>
          <Scene />
          <SwitchAxie />
        </>
      )}
    </main>
  );
}
