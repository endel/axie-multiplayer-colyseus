import { Canvas } from "@react-three/fiber";
import Floor from "./floor";
import { Physics } from "@react-three/rapier";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import Players from "./player/players";

export default function Scene() {
  return (
    <Canvas>
      <KeyboardControls
        map={[
          { name: "up", keys: ["ArrowUp", "KeyW"] },
          { name: "down", keys: ["ArrowDown", "KeyS"] },
          { name: "left", keys: ["ArrowLeft", "KeyA"] },
          { name: "right", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <ambientLight intensity={2} />

        <OrbitControls />

        <Physics>
          <Floor />

          <Players />
        </Physics>
      </KeyboardControls>
    </Canvas>
  );
}
