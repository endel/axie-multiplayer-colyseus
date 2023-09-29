function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomPosition(): [x: number, y: number, z: number] {
  return [randomInRange(0, 3), randomInRange(3, 5), randomInRange(0, 3)];
}
