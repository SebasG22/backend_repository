import { Injectable, Logger } from "@nestjs/common";
import { query } from "express";
import { Team } from "./team.model";

@Injectable()
export class TeamService {

    private teams: Team[] = [
        {
            id: "1",
            background: "yellow",
            name: "Colombia",
            flag_icon: "https://flagicon.org/co.svg"
        },
        {
            id: "2",
            background: "blue",
            name: "Argentina",
            flag_icon: "https://flagicon.org/ar.svg"
        },
    ];

    constructor() {
    }

    getTeams(): Team[] {
        return this.teams;
    }

    getTeamById(teamId: string): Team | undefined {
        return this.teams.find((team) => team.id === teamId);
    }

    createTeam(name: string, flag_icon: string, background: string): Team {
        const id = (this.teams.length + 1).toString(10);
        const newTeam: Team = {
            id,
            name,
            background,
            flag_icon,
        };
        this.teams.push(newTeam);
        Logger.warn(this.teams);
        return newTeam;
    }
}