import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeamService } from './service/team/team.service';
import { ITeams } from '../../interfaces/team/teams.interface';
import { IReturn } from '../../interfaces/return.interface';

@Controller('team')
export class TeamController {

    constructor(
        private readonly teamService: TeamService,
        
      ) {}

        @Get()
        async findTeams(): Promise<IReturn>{
            return this.teamService.getTeams()
        }

        @Post("create")
        async createTeam(@Body() body:ITeams): Promise<IReturn>{
            return this.teamService.createTeam(body)
        }
}
