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

interface RemotePlayerProps {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  animation: string;
  axie: AxieStarter;
}

export default function RemotePlayer({
  position,
  rotation,
  animation,
  axie,
}: RemotePlayerProps) {
  const playerRef = useRef<THREE.Group | null>(null);
  const physicRef = useRef<RapierRigidBody>(null);
  const translation = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (!playerRef.current) return;
    if (!physicRef.current) return;
    if (!position) return;

    translation.current.set(position.x, position.y, position.z);
    physicRef.current.setTranslation(translation.current, true);

    playerRef.current.position.lerp(translation.current, 0.3);
    playerRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
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
        <Axie position={[0, -0.3, 0]} name={axie} animation={animation} />
      </group>
    </group>
  );
}
