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

  public async findProfileByIdUser(id: string) {
    try {
      const query = this.conn
        .createQueryBuilder('user_profile')
        .leftJoinAndSelect('user_profile.profile', 'profile')
        .where('user_profile.id_user = :id_user', { id_user: id })
        .getMany();
      const linkProfile = await query;
      return linkProfile;
    } catch (e) {
      console.log(e);
      throw {
        message: 'Ocorreu um erro ao tentar buscar por usuário',
        status: 500,
      };
    }
  }

  public async profileSelectedUser(
    idSelected: string,
    idUser: string,
  ): Promise<boolean> {
    try {
      let update = false;

      await this.conn.update({ id_user: idUser }, { active: false });

      const profile = await this.conn.update(
        { id: idSelected },
        { active: true },
      );

      if (!Array.isArray(profile)) {
        if (profile.affected == 1) {
          update = true;
        }
      }
      return update;
    } catch (e) {
      throw {
        message: 'Ocorreu um erro ao tentar buscar por usuário',
        status: 500,
      };
    }
  }
}
