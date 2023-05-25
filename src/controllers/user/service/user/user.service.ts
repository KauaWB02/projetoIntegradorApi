import { Injectable } from '@nestjs/common';
import { IUser } from '../../../../interfaces/user/user.interface';
import { AppDataSource } from '../../../../database/connection';
import { Users } from '../../../../entity/User';
import { IReturn } from '../../../../interfaces/user/return.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private conn: Repository<Users>;
  constructor() {
    this.conn = AppDataSource.getRepository(Users);

  }


  async getUsers(): Promise<IReturn> {


    const objectReturn: IReturn = {
      message: '',
      error: '',
      status: 200,
    };
    try {

      const users = await this.conn.find();

      objectReturn.message = users;
    } catch (e) {
      objectReturn.message = 'Erro ao tentar buscar usuários';
      objectReturn.error = e.message;
      objectReturn.status = 400;
    } finally {
      return objectReturn;
    }
  }

  async createUser(body: IUser): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      error: '',
      status: 200,
    };
    try {
      const { name, email, password, type } = body;

      if (!name) throw { message: `Campo 'name' é obrigatório`, status: 400 };
      if (!email) throw { message: `Campo 'e-mail' é obrigatório`, status: 400 };
      if (!password) throw { message: `Campo 'password' é obrigatório`, status: 400 };
      if (!type) throw { message: `Campo 'type' é obrigatório`, status: 400 };

      let id = '4aa081e2-26d9-41b2-956a-dcd42cf8d355'

      await this.conn.save({ id, name, email, password, type });
      objectReturn.message = `Usuário ${name} cadastrado`;

    } catch (e) {
      objectReturn.message = 'Erro ao criar um usuário';
      objectReturn.error = e.message;
      objectReturn.status = e.status;
    } finally {
      return objectReturn;
    }
  }
}
