import { Repository } from "typeorm";
import { team } from "../entity/team";
import { AppDataSource } from "./connection";
import { ITeams } from "../interfaces/team/teams.interface";

export class teamModel {
    private conn: Repository<team>;
    constructor() {
        this.conn = AppDataSource.getRepository(team);
    }
    public async selectAllTeams(): Promise<Array<team>> {

        try {

            const teams = this.conn.find()
            return teams;

        } catch (error) {
            console.log(error);
            throw {
                message: 'Ocorreu um erro ao tentar buscar por times',
                status: 500,
            };
        }

    }
    public async createTeam(body: ITeams): Promise<team> {

        try {

            const teams = this.conn.create({
                name: body.name,
                description: body.description,
                leader: body.leader,
                logo: body.logo
            })
            this.conn.save(teams)
            return teams;

        } catch (error) {
            console.log(error);
            throw {
                message: 'Ocorreu um erro ao tentar buscar por times',
                status: 500,
            };
        }

    }
    public async updateTeam(data: ITeams, idTeam: string): Promise<boolean> {
        try {
          let update = false;
          const user = await this.conn.update({ id: idTeam }, data);
          if (!Array.isArray(user)) {
            if (user.affected == 1) {
              update = true;
            }
          }
          return update;
        } catch (e) {
          throw {
            message: 'Ocorreu um erro ao tentar atualizar usuário',
            status: 500,
          };
        }
      }
    public async selectById(idTeam: string): Promise<team> {

        try {
            const teams = await this.conn.findOneBy({id: idTeam})
           
            return teams;

        } catch (error) {
            console.log(error);
            throw {
                message: 'Ocorreu um erro ao tentar buscar por times',
                status: 500,
            };
        }

    }
    public async deleteTeam(idTeam: string): Promise<any> {
        try {
          let update = false;

          const profile = await this.conn.delete({ id: idTeam });
          if (!Array.isArray(profile)) {
            if (profile.affected == 1) {
              update = true;
            }
          }
          return update;
        } catch (e) {
          throw {
            message: 'Ocorreu um erro ao tentar atualizar usuário',
            status: 500,
          };
        }
      }
}