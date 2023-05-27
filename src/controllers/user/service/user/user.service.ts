import { Injectable } from '@nestjs/common';
import { IUser } from '../../../../interfaces/user/user.interface';
import { IReturn } from '../../../../interfaces/user/return.interface';
import { UserModel } from '../../../../database/userModel';
import bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(private readonly userModel: UserModel) {}

  async getUsers(): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      error: '',
      data: [],
      status: 200,
    };
    try {
      const users = await this.userModel.findAllUsers();

      objectReturn.message = 'Listando todos os usuários cadastrados';
      objectReturn.data = users;
    } catch (e) {
      objectReturn.message = 'Erro ao tentar buscar usuários';
      objectReturn.error = e.message;
      objectReturn.status = 400;
    } finally {
      return objectReturn;
    }
  }

  async getUserById(idUser: string): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
      error: '',
      status: 200,
    };
    try {
      if (!idUser)
        throw { message: `Parametro 'idUser' obrigatório`, status: 400 };

      const user = await this.userModel.findUserById(idUser);

      if (!user) throw { message: `Usuário não encontrado!`, status: 500 };

      objectReturn.message = `Usuário ${user.name} encontrado!`;
      objectReturn.data = user;
    } catch (e) {
      objectReturn.message = 'Erro ao buscar usuário';
      objectReturn.error = e.message;
      objectReturn.status = e.status;
      throw e;
    } finally {
      return objectReturn;
    }
  }

  async createUser(body: IUser): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
      error: '',
      status: 200,
    };
    try {
      const { name, email, password, type } = body;
      if (!name) throw { message: `Campo 'name' é obrigatório`, status: 400 };
      if (!email)
        throw { message: `Campo 'e-mail' é obrigatório`, status: 400 };
      if (!password)
        throw { message: `Campo 'password' é obrigatório`, status: 400 };
      if (!type) throw { message: `Campo 'type' é obrigatório`, status: 400 };

      const saltGer = await bcrypt.genSalt(10);

      console.log(saltGer);

      const cadastroUser: IUser = {
        name: name,
        email: email,
        password: await bcrypt.hash(password, saltGer),
        type: type,
      };
      const userCreate = await this.userModel.createUser(cadastroUser);

      objectReturn.message = `Usuário ${userCreate.name} cadastrado`;
      objectReturn.data = userCreate;
    } catch (e) {
      objectReturn.message = 'Erro ao criar um usuário';
      objectReturn.error = e.message;
      objectReturn.status = e.status;
    } finally {
      return objectReturn;
    }
  }

  async updateUser(body: IUser, idUser: string): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
      error: '',
      status: 200,
    };
    try {
      const { name, email, password, type } = body;

      const data = await this.userModel.findUserById(idUser);

      if (!data) throw { message: `Usuário não encontrado!`, status: 500 };

      data.name = name || data.name;
      data.email = email || data.email;
      data.password = password || data.password;
      data.type = type || data.type;

      const updated = await this.userModel.updateUser(data, idUser);

      if (!updated)
        throw {
          message: `Algo aconteceu ao tentar atualizar o usuário [${data.id}]`,
          status: 500,
        };

      objectReturn.message = `Usuário ${data.name} Atualizado!`;
      objectReturn.data = data;
    } catch (e) {
      objectReturn.message = 'Erro ao atualizar o usuário';
      objectReturn.error = e.message;
      objectReturn.status = e.status;
    } finally {
      return objectReturn;
    }
  }

  async deleteUser(idUser: string): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
      error: '',
      status: 200,
    };
    try {
      const data: IUser = {
        deleted_user: 'D',
      };
      const updated = await this.userModel.updateUser(data, idUser);

      if (!updated)
        throw {
          message: `Algo aconteceu ao tentar excluir o usuário [${data.id}]`,
          status: 500,
        };
      objectReturn.message = `Usuário com ID [${idUser}] excluido`;
    } catch (e) {
      console.log(e);
      objectReturn.message = 'Erro ao excluir um usuário';
      objectReturn.error = e.message;
      objectReturn.status = e.status;
    } finally {
      return objectReturn;
    }
  }
}
