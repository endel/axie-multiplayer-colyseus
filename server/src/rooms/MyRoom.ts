import { Room, Client } from "@colyseus/core";
import { MyRoomState, Player, Vec3, MessageType, SKINS } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  // maxClients = 4;

  onCreate (options: any) {
    this.setState(new MyRoomState());

    //
    // handle MOVE
    //
    this.onMessage(MessageType.MOVE, (client, payload) => {
      const player = this.state.players.get(client.sessionId);

      // validate input
      if (player && Array.isArray(payload) && payload.length === 6) {
        player.position.x = payload[0];
        player.position.y = payload[1];
        player.position.z = payload[2];

        player.rotation.x = payload[3];
        player.rotation.y = payload[4];
        player.rotation.z = payload[5];
      }
    });
  }

  onJoin (client: Client, options: any) {
    const skin = SKINS[Math.floor(Math.random()*SKINS.length)];

    this.state.players.set(client.sessionId, new Player().assign({
      skin,
      position: new Vec3().assign({ x: 0, y: 0, z: 0 }),
      rotation: new Vec3().assign({ x: 0, y: 0, z: 0 }),
    }))
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
