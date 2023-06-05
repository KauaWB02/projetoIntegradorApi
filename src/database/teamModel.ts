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
}