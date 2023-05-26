import { Repository } from 'typeorm';
import { Users } from '../entity/User';
import { AppDataSource } from './connection';
import { IUser } from '../interfaces/user/user.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserModel {
  private conn: Repository<Users>;
  constructor() {
    this.conn = AppDataSource.getRepository(Users);
  }

  public async findAllUsers(): Promise<Array<IUser>> {
    try {
      const users = await this.conn.find();
      return users;
    } catch (e) {
      throw {
        message: 'Ocorreu um erro ao tentar buscar por usuários',
        status: 500,
      };
    }
  }

  public async createUser(body: IUser): Promise<IUser> {

    try {
      const user = this.conn.create({
        name: body.name,
        email: body.email,
        password: body.password,
        type: body.type,
      });
      await this.conn.save(user);
      return user;
    } catch (e) {
      throw {
        message: 'Ocorreu um erro ao tentar criar usuário',
        status: 500,
      };
    }
  }

  public async findUserById(idUser: string): Promise<IUser> {
    try {
      const user = await this.conn.findOneBy({ id: idUser });
      return user;
    } catch (e) {
      throw {
        message: 'Ocorreu um erro ao tentar buscar por usuário',
        status: 500,
      };
    }
  }

  public async updateUser(data: IUser, idUser: string): Promise<boolean> {
    try {
      let update = false;
      const user = await this.conn.update({ id: idUser }, data);
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
