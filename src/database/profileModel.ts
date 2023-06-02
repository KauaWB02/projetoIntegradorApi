import { Repository } from 'typeorm';
import { AppDataSource } from './connection';
import { Profile } from '../entity/Profile';
import { IProfile } from '../interfaces/profile/profile';

export class ProfileModel {
  private conn: Repository<Profile>;
  constructor() {
    this.conn = AppDataSource.getRepository(Profile);
  }

  public async findAllProfiles(): Promise<Array<IProfile>> {
    try {
      const profile = await this.conn.find();
      const data: Array<IProfile> = [];
      for (const objectProfile of profile) {
        const templatObject: IProfile = {
          id: objectProfile.id,
          name: objectProfile.name,
          createdAt: objectProfile.created_at,
          updatedAt: objectProfile.updated_at,
        };
        data.push(templatObject);
      }

      return data;
    } catch (e) {
      throw {
        message: 'Ocorreu um erro ao tentar buscar por usuário',
        status: 500,
      };
    }
  }

  public async findOneById(id: string): Promise<IProfile> {
    try {

      const profile = await this.conn.findOneBy({
        id: id,
      });


      const data: IProfile = {
        id: profile.id,
        name: profile.name,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
      };

      return data;
    } catch (e) {
      console.log(e);
      throw {
        message: 'Ocorreu um erro ao tentar buscar por usuário',
        status: 500,
      };
    }
  }


  public async findOneByName(name: string): Promise<IProfile| null > {
    try {
      const profile = await this.conn.findOneBy({
        name: name,
      });

      if(!profile) return null

      const data: IProfile = {
        id: profile.id,
        name: profile.name,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
      };

      return data;
    } catch (e) {
      console.log(e);
      throw {
        message: 'Ocorreu um erro ao tentar buscar por usuário',
        status: 500,
      };
    }
  }

  public async createProfile(name: string): Promise<IProfile> {
    try {
      const createProfile = this.conn.create({ name: name });
      const profile = await this.conn.save(createProfile);
      const data: IProfile = {
        id: profile.id,
        name: profile.name,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
      };

      return data;
    } catch (e) {
      throw {
        message: 'Ocorreu um erro ao tentar buscar por usuário',
        status: 500,
      };
    }
  }

  public async updateProfile(id: string, name: string): Promise<boolean> {
    try {
      let update = false;
      const profile = await this.conn.update({ id: id }, { name: name });
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

  public async deleteProfile(id: string): Promise<any> {
    try {
      const profile = await this.conn.delete({ id: id });

      return profile;
    } catch (e) {
      throw {
        message: 'Ocorreu um erro ao tentar atualizar usuário',
        status: 500,
      };
    }
  }
}
