import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Team } from "./team.model";
import { TeamService } from "./team.service";

@Resolver(() => Team)
export class TeamResolver {
    constructor(private teamService: TeamService) {
    }

    @Query(() => [Team])
    getAllTeams(): Team[] {
        return this.teamService.getTeams();
    }

    @Query(() => Team)
    getTeamById(@Args("teamId", {type: () => ID}) teamId: string): Team {
        return this.teamService.getTeamById(teamId);
    }

    @Mutation(() => Team)
    createTeam(@Args("name") name: string, @Args("flag_icon") flag_icon: string, @Args("background") background: string): Team {
        return this.teamService.createTeam(name, flag_icon, background)
    }
}
