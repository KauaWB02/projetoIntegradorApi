import { HttpException, Injectable } from '@nestjs/common';
import { IReturn } from '../../../../interfaces/return.interface';
import { ITeams } from '../../../../interfaces/team/teams.interface';
import { teamModel } from '../../../../database/teamModel';
import { userTeamModel } from '../../../../database/userTeam';
import { UserModel } from '../../../../database/userModel';
import { user_team } from '../../../../entity/user_team';

@Injectable()
export class TeamService {

  constructor(
    private readonly teamModel: teamModel,
    private readonly userTeamModel: userTeamModel,
    private readonly userModel: UserModel) { }

  async getTeams(): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {
      const teams = await this.teamModel.selectAllTeams();
      const teamsData: Array<ITeams> = [];

      teams.map((objTeams) => {
        const templateObject: ITeams = {
          id: objTeams.id,
          name: objTeams.name,
          description: objTeams.description,
          leader: objTeams.leader,
          logo: objTeams.logo,
          createdAt: objTeams.created_at,
          updatedAt: objTeams.updated_at,
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

  async updateTeam(
    body: ITeams,
    idTeam: string,
    idUser: string,
  ): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {
      console.log(idTeam);
      const { name, logo, description } = body;

      const teams = await this.teamModel.selectById(idTeam);

      if (!teams) throw { message: `Esse time não existe`, status: 400 };

      if (teams.leader !== idUser)
        throw { message: `Você não tem permissão para isso`, status: 400 };

      teams.name = name || teams.name;
      teams.logo = logo || teams.logo;
      teams.description = description || teams.description;
      const update = await this.teamModel.updateTeam(body, idTeam);

      if (!update)
        throw {
          message: `Algo aconteceu ao tentar atualizar o time [${teams.name}]`,
          status: 500,
        };

      objectReturn.message = 'Time atualizado';
      objectReturn.data = teams;
      return objectReturn;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        {
          status: e.status,
          error: e.message,
        },
        e.status,
      );
    }
  }

  async getByIdTeam(idTeam: string): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {
      const teams = await this.teamModel.selectById(idTeam);
      const teamsData: ITeams = {
        id: teams.id,
        name: teams.name,
        description: teams.description,
        leader: teams.leader,
        logo: teams.logo,
        createdAt: teams.created_at,
        updatedAt: teams.updated_at,
      };

      objectReturn.message = `Time selecionado ${teams.name}`;
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

      const team = await this.teamModel.createTeam(body);

      const teamData: ITeams = {
        id: team.id,
        name: team.name,
        description: team.description,
        leader: team.leader,
        logo: team.logo,
        createdAt: team.created_at,
        updatedAt: team.updated_at,
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

  async deleteTeam(idTeam: string): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {
      const teams = await this.teamModel.deleteTeam(idTeam);
      if (!teams)
        throw {
          message: `Algo aconteceu ao tentar excluir o time [${idTeam}]`,
          status: 500,
        };
      objectReturn.message = `Time excluido ${idTeam}`;
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

  async getAllUserInvites(id: string): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {

      if (!id)
        throw {
          message: `campo id precisa ser inserido`,
          status: 400,
        };

      const user = await this.userModel.findUserById(id);



      if (!user)
        throw {
          message: `usuário não encontrado`,
          status: 400,
        };


      const invites = await this.userTeamModel.selectInvites(id);
      objectReturn.message = `buscando convites`;
      objectReturn.data = invites;
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

  async sendUserInvite(body: user_team): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {

      if (!body.id_user)
        throw {
          message: `campo id_user precisa ser inserido`,
          status: 400,
        };

      if (!body.id_team)
        throw {
          message: `campo id_team precisa ser inserido`,
          status: 400,
        };


      const user = await this.userModel.findUserById(body.id_user);

      const team = await this.teamModel.selectById(body.id_team)

      if (!user)
        throw {
          message: `usuário não encontrado`,
          status: 400,
        };

      if (!team)
        throw {
          message: `time não encontrado`,
          status: 400,
        };

      const invite = await this.userTeamModel.sendInvite(body)
      objectReturn.message = `enviando convite`;
      objectReturn.data = invite;
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

  async acceptUserInvite(idInvite: string): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {

      if (!idInvite)
        throw {
          message: `Parametro na URL está faltando!`,
          status: 400,
        };

      // const user = await this.userModel.findUserById(idInvite);

      // if (!user)
      //   throw {
      //     message: `usuário não encontrado`,
      //     status: 400,
      //   };

      const accept = await this.userTeamModel.acceptInvite(idInvite);


      if (!accept)
        throw {
          message: `Algo aconteceu, contate um Adm`,
          status: 500,
        };


      objectReturn.message = `Convite aceito!.`;
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
