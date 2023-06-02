import { HttpException, Injectable } from '@nestjs/common';
import { ProfileModel } from '../../../../database/profileModel';
import { IReturn } from '../../../../interfaces/return.interface';
import { IProfile } from '../../../../interfaces/profile/profile';

@Injectable()
export class ProfileService {
  constructor(private readonly profileModel: ProfileModel) {}

  async findAllProfiles(): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {
      const profiles = await this.profileModel.findAllProfiles();

      objectReturn.message = 'Listando todos os perfis cadastrados';
      objectReturn.data = profiles;
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

  async findOneById(idProfile: string): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {
      const id = idProfile;
      if (!id) throw { message: 'Campo "Name" obrigatório', status: 400 };

      const profile = await this.profileModel.findOneById(id);

      objectReturn.message = `Listando a configuração de Profile ${profile.id}`;
      objectReturn.data = profile;
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

  async createProfile(body: IProfile): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {
      const { name } = body;

      if (!name) throw { message: 'Campo "Name" obrigatório', status: 400 };

      const profile = await this.profileModel.createProfile(name);

      objectReturn.message = `Configuração de perfil ${profile.name}, concluída!`;
      objectReturn.data = profile;
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

  async updateProfile(id: string, body: IProfile): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {
      const { name } = body;

      const data = await this.profileModel.findOneById(id);

      if (!data)
        throw { message: `Esse perfil ${name} já existe`, status: 500 };

      data.name = name || data.name;

      const updated = await this.profileModel.updateProfile(id, name);

      if (!updated)
        throw {
          message: `Algo aconteceu ao tentar atualizar o usuário [${data.id}]`,
          status: 500,
        };

      objectReturn.message = `Atualização de perfil ${data.name}, concluida!`;
      objectReturn.data = data;
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

  async deleteProfile(id: string): Promise<any> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {
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
