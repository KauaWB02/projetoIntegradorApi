import { HttpException, Injectable } from '@nestjs/common';
import { IReturn } from '../../../../interfaces/return.interface';
import { UserModel } from '../../../../database/userModel';
import { IUser } from '../../../../interfaces/user/user.interface';
import { jwt as keyJwt } from '../../../../config/app';
import * as jwt from 'jsonwebtoken';
import bcrypt = require('bcrypt');

@Injectable()
export class LoginService {
  constructor(private readonly userModel: UserModel) {}

  async loginUser(body: IUser): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {
      const { email, password } = body;

      if (!email)
        throw { message: `Campo 'e-mail' é obrigatório`, status: 400 };
      if (!password)
        throw { message: `Campo 'password' é obrigatório`, status: 400 };

      const user = await this.userModel.findUserByEmail(email);

      if (!user)
        throw {
          message: `E-mail ou senha incorretas, favor verificar`,
          status: 400,
        };

      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ selectedProfile: true }, keyJwt.secret, {
          expiresIn: '2m',
        });
        console.log(user);
        objectReturn.message = `Usuário ${user.name}, Agora selecione um perfil!`;
        objectReturn.data = { id: user.id, name: user.name, token: token };
        return objectReturn;
      }
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
