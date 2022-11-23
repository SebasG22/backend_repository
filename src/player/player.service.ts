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
        },
      {
        id: "5",
        name: "Emiliano Martinez",
        birth: "2-9-1992",
        teamId: "10",
        foot: PlayerFoot.RIGHT,
        height: 1.95,
        weight: 88,
        position: [PlayerPosition.GK]
      },
      {
        id: "6",
        name: "Marcos Acuña",
        birth: "28-10-1991",
        teamId: "10",
        foot: PlayerFoot.RIGHT,
        height: 1.72,
        weight: 69,
        position: [PlayerPosition.CM, PlayerPosition.CDM]
      },
      {
        id: "7",
        name: "Nahuel Molina",
        birth: "6-4-1998",
        teamId: "10",
        foot: PlayerFoot.LEFT,
        height: 1.75,
        weight: 70,
        position: [PlayerPosition.CM, PlayerPosition.CDM]
      },
      {
        id: "8",
        name: "Nicolás Otamendi",
        birth: "12-2-1988",
        teamId: "10",
        foot: PlayerFoot.RIGHT,
        height: 1.83,
        weight: 81,
        position: [PlayerPosition.CB]
      },
      {
        id: "9",
        name: "Cristian Romero",
        birth: "27-4-1998",
        teamId: "10",
        foot: PlayerFoot.RIGHT,
        height: 1.85,
        weight: 79,
        position: [PlayerPosition.RB, PlayerPosition.RWB]
      },
      {
        id: "10",
        name: "Rodrigo de Paul",
        birth: "24-5-1994",
        teamId: "10",
        foot: PlayerFoot.RIGHT,
        height: 1.80,
        weight: 70,
        position: [PlayerPosition.LWB, PlayerPosition.LW]
      },
      {
        id: "11",
        name: "Ángel Di María",
        birth: "14-2-1988",
        teamId: "10",
        foot: PlayerFoot.RIGHT,
        height: 1.80,
        weight: 75,
        position: [PlayerPosition.CAM, PlayerPosition.LW]
      },
      {
        id: "12",
        name: "Giovani Lo Celso",
        birth: "9-4-1996",
        teamId: "10",
        foot: PlayerFoot.RIGHT,
        height: 1.77,
        weight: 70,
        position: [PlayerPosition.CAM, PlayerPosition.LW]
      },
      {
        id: "13",
        name: "Leandro Paredes",
        birth: "29-6-1994",
        teamId: "10",
        foot: PlayerFoot.RIGHT,
        height: 1.80,
        weight: 75,
        position: [PlayerPosition.RB, PlayerPosition.RWB]
      },
      {
        id: "14",
        name: "Lautaro Martinez",
        birth: "22-8-1997",
        teamId: "10",
        foot: PlayerFoot.RIGHT,
        height: 1.74,
        weight: 72,
        position: [PlayerPosition.CAM, PlayerPosition.RWB]
      },
      {
        id: "15",
        name: "Lionel Messi",
        birth: "24-6-1987",
        teamId: "10",
        foot: PlayerFoot.LEFT,
        height: 1.70,
        weight: 72,
        position: [PlayerPosition.CAM, PlayerPosition.ST]
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
