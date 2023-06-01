import { Repository } from 'typeorm';
import { AppDataSource } from './connection';
import { User_Profile } from '../entity/User_Profile';

export class userProfileModel {
  private conn: Repository<User_Profile>;
  constructor() {
    this.conn = AppDataSource.getRepository(User_Profile);
  }

  public async linkUserToProfile(
    idUser: string,
    idProfile: string,
  ): Promise<User_Profile> {
    try {
      const link = this.conn.create({
        id_user: idUser,
        id_profile: idProfile,
      });
      const linkProfile = await this.conn.save(link);
      return linkProfile;
    } catch (e) {
      throw {
        message: 'Ocorreu um erro ao tentar buscar por usuário',
        status: 500,
      };
    }
  }
}
