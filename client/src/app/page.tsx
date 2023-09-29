"use client";

import SwitchAxie from "@/components/overlay/switch-axie";
import Scene from "@/components/scene";
import { insertCoin } from "playroomkit";
import { useEffect, useState } from "react";

export default function Home() {
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const joinPlayRoom = async () => {
      try {
        await insertCoin();
        setIsJoined(true);
      } catch (error) {
        console.log("Join error: ", error);
      }
    };

    joinPlayRoom();
  }, []);

  return (
    <main className="relative w-screen h-screen bg-slate-100">
      {isJoined && (
        <>
          <Scene />
          <SwitchAxie />
        </>
      )}
    </main>
  );
}
