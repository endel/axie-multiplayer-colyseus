import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CapsuleCollider, RapierRigidBody, RigidBody, } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useColyseusRoom, useColyseusState } from "../../net";
import { AxieStarter } from "@sms0nhaaa/r3f-axie-starter";
import Axie from "./axie";

import { MessageType } from "../../../../server/src/rooms/schema/MyRoomState";

const SPEED = 1.5;
const JUMP_HEIGHT = 2;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

const OFFSET = 5;

interface LocalPlayerProps {
  position: [x: number, y: number, z: number];
}

export default function LocalPlayer({ position }: LocalPlayerProps) {
  const playerRef = useRef<THREE.Group | null>(null);
  const physicRef = useRef<RapierRigidBody>(null);
  const [animation, setAnimation] = useState("idle");
  const frames = useRef(0);

  const room = useColyseusRoom();

  // @ts-ignore
  const player = useColyseusState((state) => state.players.get(room.sessionId))

  const up = useKeyboardControls((state) => state.up);
  const down = useKeyboardControls((state) => state.down);
  const left = useKeyboardControls((state) => state.left);
  const right = useKeyboardControls((state) => state.right);
  const jump = useKeyboardControls((state) => state.jump);

  useEffect(() => {
    const animation = up || down || left || right ? "walk" : "idle";

    setAnimation(animation);
    room.send(MessageType.ANIMATION, animation);
  }, [up, down, left, right]);

  useFrame(({ camera }) => {
    frames.current += 1;

    if (!physicRef.current) return;
    if (!playerRef.current) return;

    if (up || down || left || right || jump) {
      up && playerRef.current.rotation.set(0, Math.PI, 0);
      down && playerRef.current.rotation.set(0, 0, 0);
      left &&
        playerRef.current.rotation.set(
          0,
          -Math.PI / 2 + (up ? -Math.PI / 4 : down ? Math.PI / 4 : 0),
          0,
        );
      right &&
        playerRef.current.rotation.set(
          0,
          Math.PI / 2 + (up ? Math.PI / 4 : down ? -Math.PI / 4 : 0),
          0,
        );

      jump &&
        physicRef.current.setLinvel(
          {
            x: physicRef.current.linvel().x,
            y: JUMP_HEIGHT,
            z: physicRef.current.linvel().z,
          },
          true,
        );
    }

    frontVector.set(0, 0, Number(down) - Number(up));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED);
    physicRef.current.setLinvel(
      { x: direction.x, y: physicRef.current.linvel().y, z: direction.z },
      true,
    );

    const translate = physicRef.current.translation();

    if (physicRef.current.translation().y < -2)
      physicRef.current.setTranslation(new THREE.Vector3(0, 5, 0), true);

    playerRef.current.position.set(translate.x, translate.y, translate.z);

    if (frames.current % OFFSET === 0) {
      room.send(MessageType.MOVE, [
          translate.x,
          translate.y,
          translate.z,
          playerRef.current.rotation.x,
          playerRef.current.rotation.y,
          playerRef.current.rotation.z,
      ]);
      frames.current = 0;
    }

    camera.position.z = translate.z + 2;
    camera.position.x = translate.x;
    camera.lookAt(playerRef.current.position.clone().setY(1));
  });

  return (
    <group name="local-player">
      <RigidBody
        position={position}
        ref={physicRef}
        canSleep={true}
        colliders={false}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[0.1, 0.2]} />
      </RigidBody>
      <group ref={playerRef}>
        <Axie
          position={[0, -0.3, 0]}
          name={player.skin as AxieStarter}
          animation={animation}
        />
      </group>
    </group>
  );
}
