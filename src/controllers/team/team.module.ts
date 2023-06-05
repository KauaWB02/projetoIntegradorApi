import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './service/team/team.service';
import { teamModel } from '../../database/teamModel';

@Module({
    controllers: [TeamController],
    providers: [TeamService,teamModel],
})
export class TeamModule {}
