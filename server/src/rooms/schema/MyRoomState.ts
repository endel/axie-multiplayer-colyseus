import { Schema, MapSchema, Context, type } from "@colyseus/schema";

export const SKINS = ["buba", "pomodoro", "puffy"];

export enum MessageType {
  MOVE = 0,
  ANIMATION = 1,
  CHANGE_SKIN = 2,
}

export class Vec3 extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  @type("number") z: number;
}

export class Player extends Schema {
  @type("string") skin: string;
  @type("string") animation: string;
  @type(Vec3) position: Vec3;
  @type(Vec3) rotation: Vec3;
}

export class MyRoomState extends Schema {
  @type({map: Player}) players = new MapSchema<Player>();
}

