import { Repository } from "typeorm";
import { AppDataSource } from "./connection";
import { user_team } from "../entity/user_team";

export class userTeamModel {
  private conn: Repository<user_team>;
  constructor() {
    this.conn = AppDataSource.getRepository(user_team);
  }

  public async selectInvites(id: string): Promise<Array<user_team>> {

    try {

      const invites = await this.conn.find({ where: { id_user: id, accept: 0 } })
      return invites;

    } catch (error) {
      console.log(error);
      throw {
        message: 'Ocorreu um erro ao tentar buscar por times',
        status: 500,
      };
    }
  }

  public async sendInvite(body: user_team): Promise<user_team> {

    try {

      const createInvite = this.conn.create(
        {
          id_team: body.id_team,
          id_user: body.id_user,
          accept: 0
        }
      )

      const invite = await this.conn.save(createInvite)


      return invite;

    } catch (error) {
      console.log(error);
      throw {
        message: 'Ocorreu um erro ao tentar buscar por times',
        status: 500,
      };
    }
  }

  public async acceptInvite(idInvite: string): Promise<boolean> {
    try {
      let update = false;
      const user = await this.conn.update({ id: idInvite }, { accept: 1 });
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

}