import { AxieStarter } from "@sms0nhaaa/r3f-axie-starter";
import Axie from "./axie";
import * as THREE from "three";
import { useRef } from "react";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

import type { Player } from "../../../../server/src/rooms/schema/MyRoomState";

interface RemotePlayerProps {
  player: Player
}

export default function RemotePlayer({ player }: RemotePlayerProps) {
  const playerRef = useRef<THREE.Group | null>(null);
  const physicRef = useRef<RapierRigidBody>(null);
  const translation = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (!playerRef.current) return;
    if (!physicRef.current) return;
    if (!player) return;

    translation.current.set(player.position.x, player.position.y, player.position.z);
    physicRef.current.setTranslation(translation.current, true);

    playerRef.current.position.lerp(translation.current, 0.3);
    playerRef.current.rotation.set(player.rotation.x, player.rotation.y, player.rotation.z);
  });

  return (
    <group name="remote-player">
      <RigidBody
        ref={physicRef}
        canSleep={true}
        colliders={false}
        enabledRotations={[false, false, false]}
        position={[0, 5, 0]}
      >
        <CapsuleCollider args={[0.1, 0.2]} />
      </RigidBody>
      <group ref={playerRef}>
        <Axie position={[0, -0.3, 0]} name={player.skin as AxieStarter} animation={player.animation} />
      </group>
    </group>
  );
}
