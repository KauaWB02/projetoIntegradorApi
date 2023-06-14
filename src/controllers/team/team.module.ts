import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './service/team/team.service';
import { teamModel } from '../../database/teamModel';
import { userTeamModel } from '../../database/userTeam';
import { UserModel } from '../../database/userModel';

@Module({
    controllers: [TeamController],
    providers: [TeamService,teamModel,userTeamModel,UserModel],
})
export class TeamModule {}
