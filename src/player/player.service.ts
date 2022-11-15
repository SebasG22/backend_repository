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
            foot: PlayerFoot.LEFT,
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
        },
        {
            id: "03",
            name: "Rino",
            birth: "1998-12-11",
            teamId: "1",
            foot: PlayerFoot.LEFT,
            height: 1.72,
            weight: 75,
            position: [PlayerPosition.CM,PlayerPosition.LR]
        },
        {
            id: "04",
            name: "Pepito Pearez",
            birth: "1998-12-11",
            teamId: "2",
            foot: PlayerFoot.RIGHT,
            height: 1.72,
            weight: 75,
            position: [PlayerPosition.RWB,PlayerPosition.CM]
        }
    ];

    constructor() {
    }

    getPlayers() {
        return this.players;
    }

    getPlayersByTeam(teamId:string) {
        return this.players.filter(player => player.teamId === teamId );
    }
    
    getAllPlayersByPositions(positions:PlayerPosition[]) {
        return this.players.filter(player => positions.some(position => player.position.includes(position)));
    }

    getAllPlayersByFoot(foot:PlayerFoot) {
        return this.players.filter(player => player.foot === foot);
    }

    getAllPlayersByTeamWithParameters(teamId:string, foot?:PlayerFoot, positions?:PlayerPosition[]){
        let playersFiltered = this.players.filter(player => player.teamId === teamId)
        if( foot){
            playersFiltered = playersFiltered.filter(player => player.foot === foot);
        }
        if( positions && positions.length > 0){
            playersFiltered = playersFiltered.filter(player => positions.some(position => player.position.includes(position)));
        }
        return playersFiltered
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