import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Team } from "./team.model";
import { TeamService } from "./team.service";

@Resolver("Team")
export class TeamResolver {
    constructor(private teamService: TeamService) {
    }

    @Query()
    getAllTeams(): Team[] {
        return this.teamService.getTeams();
    }

    @Query()
    getTeamById(@Args("teamId") teamId: string): Team {
        return this.teamService.getTeamById(teamId);
    }

    @Mutation()
    createTeam(@Args("name") name: string, @Args("flag_icon") flag_icon: string, @Args("background") background: string): Team {
        return this.teamService.createTeam(name, flag_icon, background)
    }
}
