import { Injectable } from "@nestjs/common";
import { Player, PlayerFoot, PlayerPosition } from "./player.model";

@Injectable()
export class PlayerService {

    private players: Player[] = [
        {
            id: "01",
            name: "Juanito Perez",
            birth: "1994-08-09",
            teamId: "1",
            foot: PlayerFoot.RIGHT,
            height: 1.69,
            weight: 70,
            position: [PlayerPosition.CAM, PlayerPosition.CDM]
        },
        {
            id: "02",
            name: "Jhon Maurino",
            birth: "1998-12-11",
            teamId: "2",
            foot: PlayerFoot.RIGHT,
            height: 1.72,
            weight: 75,
            position: [PlayerPosition.GK]
        }
    ];

    constructor() {
    }

    getPlayers() {
        return this.players;
    }

    createPlayer(name: string, teamId: string, position: PlayerPosition[], birth: string, height: number, weight: number, foot: PlayerFoot) {
        const id = (this.players.length + 1).toString(10);
        const newPlayer: Player = {
            birth,
            foot,
            height,
            id,
            name,
            position,
            teamId,
            weight,
        };
        this.players.push(newPlayer);
        return newPlayer;
    }
}