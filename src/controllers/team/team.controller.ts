import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TeamService } from './service/team/team.service';
import { ITeams } from '../../interfaces/team/teams.interface';
import { IReturn } from '../../interfaces/return.interface';

@Controller('team')
export class TeamController {

    constructor(
        private readonly teamService: TeamService,

    ) { }

    @Get()
    async findTeams(): Promise<IReturn> {
        return this.teamService.getTeams()
    }

    @Post("create")
    async createTeam(@Body() body: ITeams): Promise<IReturn> {
        return this.teamService.createTeam(body)
    }

    @Get('/:idTeam')
    async findById(@Param('idTeam') idTeam: string): Promise<IReturn> {
        return this.teamService.getByIdTeam(idTeam)
    }


    @Put('update')
    async updateTeam(
     @Body() body: ITeams,
     @Query('idTeam') idTeam: string,
     @Query('idUser') idUser: string
     ): Promise<IReturn> {
        
    return this.teamService.updateTeam(body, idTeam, idUser);
    }

    @Delete('delete')
    async deleteTeam(
     @Query('idTeam') idTeam: string,
     ): Promise<IReturn> {
        
    return this.teamService.deleteTeam(idTeam);
    }


}
