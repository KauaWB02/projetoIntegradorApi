import { HttpException, Injectable } from '@nestjs/common';
import { IReturn } from '../../../../interfaces/return.interface';
import { teamModel } from '../../../../database/teamModel';
import { ITeams } from '../../../../interfaces/team/teams.interface';

@Injectable()
export class TeamService {
    constructor(
        private readonly teamModel: teamModel,

    ) { }
    async getTeams(): Promise<IReturn> {
        const objectReturn: IReturn = {
            message: '',
            data: [],
        };
        try {
            const teams = await this.teamModel.selectAllTeams();
            const teamsData: Array<ITeams> = []

            teams.map((objTeams) => {
                const templateObject: ITeams = {
                    id: objTeams.id,
                    name: objTeams.name,
                    description: objTeams.description,
                    leader: objTeams.leader,
                    logo: objTeams.logo,
                    createdAt: objTeams.created_at,
                    updatedAt: objTeams.updated_at
                };
                teamsData.push(templateObject);
            });


            objectReturn.message = 'Listando todos os times cadastrados';
            objectReturn.data = teamsData;
            return objectReturn;
        } catch (e) {
            throw new HttpException(
                {
                    status: e.status,
                    error: e.message,
                },
                e.status,
            );
        }
    }
    async createTeam(body: ITeams): Promise<IReturn> {
        const objectReturn: IReturn = {
          message: '',
          data: [],
        };
        try {
          const { name, description, leader, logo } = body;

          if (!name) throw { message: `Campo 'name' é obrigatório`, status: 400 };
          if (!leader)
            throw { message: `Campo 'leader' é obrigatório`, status: 400 };

    
            const team = await this.teamModel.createTeam(body)


            const teamData : ITeams = {
                id: team.id,
                name: team.name,
                description: team.description,
                leader: team.leader,
                logo: team.logo,
                createdAt: team.created_at,
                updatedAt: team.updated_at
            };

          objectReturn.message = `Usuário ${team.name} cadastrado`;
          objectReturn.data = teamData;
          return objectReturn;
        } catch (e) {
          throw new HttpException(
            {
              status: e.status,
              error: e.message,
            },
            e.status,
          );
        }
      }
}
