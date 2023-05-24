import { Injectable } from '@nestjs/common';
import { IUser } from '../../../../interfaces/user/user.interface';
import { AppDataSource } from '../../../../database/connection';
import { Users } from '../../../../entity/User';
import { IReturn } from '../../../../interfaces/user/return.interface';

@Injectable()
export class UserService {
  async getUsers(): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      error: '',
      status: 200,
    };
    try {
      const conn = AppDataSource.getRepository(Users);

      const users = await conn.find();

      objectReturn.message = users;
    } catch (e) {
      objectReturn.message = 'Erro ao criar um usuário';
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

      if (!name) throw { message: `Campo 'name' é obrigatório` };
      if (!email) throw { message: `Campo 'e-mail' é obrigatório` };
      if (!password) throw { message: `Campo 'password' é obrigatório` };
      if (!type) throw { message: `Campo 'type' é obrigatório` };
    } catch (e) {
      objectReturn.message = 'Erro ao criar um usuário';
      objectReturn.error = e.message;
      objectReturn.status = 400;
    } finally {
      return objectReturn;
    }
  }
}
