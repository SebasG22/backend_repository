import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Team } from "src/team/team.model";
import { TeamService } from "src/team/team.service";
import { Player, PlayerFoot, PlayerPosition } from "./player.model";
import { PlayerService } from "./player.service";

@Resolver("Player")
export class PlayerResolver {
    constructor(private playerService: PlayerService, private teamService: TeamService) {
    }

    @Query()
    getAllPlayers() {
        return this.playerService.getPlayers();
    }

    @Query()
    getAllPlayersByTeam( @Args("teamId") teamId : string) {
        return this.playerService.getPlayersByTeam(teamId);
    }

    @Query()
    getAllPlayerByPositions(@Args("positions") positions:PlayerPosition[]){
        return this.playerService.getAllPlayerByPositions(positions);
    }

    @Query()
    getAllPlayerByFoot( @Args("foot") foot:PlayerFoot) {
        return this.playerService.getAllPlayerByFoot(foot);
    }

    @ResolveField()
    team(@Parent() player: Player) {
        const { teamId } = player;
        return this.teamService.getTeamById(teamId);
    }

    @Mutation()
    createPlayer(
        @Args("name") name: string,
        @Args("teamId") teamId: string,
        @Args("position") position: PlayerPosition[],
        @Args("birth") birth: string,
        @Args("height") height: number,
        @Args("weight") weight: number,
        @Args("foot") foot: PlayerFoot
    ): Player {
        return this.playerService.createPlayer(name, teamId, position, birth, height, weight, foot);
    }
}