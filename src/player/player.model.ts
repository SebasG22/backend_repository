import { Field, Float, HideField, ID, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Team } from "src/team/team.model";

export enum PlayerPosition {
    GK = "GK",
    CM = "CM",
    CDM = "CDM",
    ST = "ST",
    CAM = "CAM",
    CB = "CB",
    RB = "RB",
    RWB = "RWB",
    LWB = "LWB",
    LR = "LR",
    LW = "LW"
}

registerEnumType(PlayerPosition, {
    name: 'PlayerPosition',
});

export enum PlayerFoot {
    LEFT = "LEFT",
    RIGHT = "RIGHT"
}

registerEnumType(PlayerFoot, {
    name: 'PlayerFoot',
});

@ObjectType()
export class Player {
    @Field(() => ID)
    id: string;
    @Field()
    name: string;
    @Field(() => Team, {nullable: false})
    team?: Team;
    @HideField()
    teamId: string;
    @Field(() => [PlayerPosition])
    position: PlayerPosition[];
    @Field()
    birth: string;
    @Field(() => Float)
    height: number;
    @Field(() => Float)
    weight: number;
    @Field(() => PlayerFoot)
    foot: PlayerFoot;
}