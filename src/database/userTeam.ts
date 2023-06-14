import { Repository } from "typeorm";
import { team } from "../entity/team";
import { AppDataSource } from "./connection";
import { ITeams } from "../interfaces/team/teams.interface";
import { user_team } from "../entity/user_team";

export class userTeamModel {
    private conn: Repository<user_team>;
    constructor() {
        this.conn = AppDataSource.getRepository(user_team);
    }
    public async selectInvites(id: string): Promise<Array<user_team>> {

        try {

            const invites = await this.conn.find({ where: { id_user: id } })
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

}