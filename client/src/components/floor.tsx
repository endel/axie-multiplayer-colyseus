import { RigidBody } from "@react-three/rapier";

const MAP_DATA: Array<[number, number, number]> = [
  [0, 0, 0],
  [0, 0, 1],
  [0, 0, 2],
  [0, 0, 3],
  [1, 0, 0],
  [1, 0, 1],
  [1, 0, 2],
  [1, 0, 3],
  [2, 0, 0],
  [2, 0, 1],
  [2, 0, 2],
  [2, 0, 3],
  [3, 0, 0],
  [3, 0, 1],
  [3, 0, 2],
  [3, 0, 3],
  [4, 0, 0],
  [4, 0, 1],
  [4, 0, 2],
  [4, 0, 3],
  [5, 0, 0],
  [5, 0, 1],
  [5, 0, 2],
  [5, 0, 3],
  [6, 0, 0],
  [6, 0, 1],
  [6, 0, 2],
  [6, 0, 3],
  [7, 0.5, 0],
  [7, 0.5, 1],
  [7, 0.5, 2],
  [8, 0.5, 0],
  [8, 0.5, 1],
  [8, 0.5, 2],
  [9, 0.5, 0],
  [9, 0.5, 1],
  [9, 0.5, 2],
  [10, 0.5, 0],
  [10, 0.5, 1],
  [10, 0.5, 2],
  [11, 0.5, 0],
  [11, 0.5, 1],
  [11, 0.5, 2],
  [9, 0.5, 3],
  [10, 0.5, 3],
  [11, 0.5, 3],
  [9, 0.5, 4],
  [10, 0.5, 4],
  [11, 0.5, 4],
  [9, 0.5, 5],
  [10, 0.5, 5],
  [11, 0.5, 5],
];

export default function Floor() {
  return (
    <group name="floor">
      {MAP_DATA.map((tile, index) => (
        <RigidBody key={index} type="fixed">
          <mesh receiveShadow position={tile}>
            <boxGeometry args={[1, 0.5, 1]} />
            <meshStandardMaterial color="lightblue" />
          </mesh>
        </RigidBody>
      ))}
    </group>
  );
}
