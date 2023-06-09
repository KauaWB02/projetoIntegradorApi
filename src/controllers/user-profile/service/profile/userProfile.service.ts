import { HttpException, Injectable } from '@nestjs/common';
import { userProfileModel } from '../../../../database/userProfile';
import { IReturn } from '../../../../interfaces/return.interface';
import { ProfileModel } from '../../../../database/profileModel';
import { UserModel } from '../../../../database/userModel';
import { jwt as keyJwt } from '../../../../config/app';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly userProfile: userProfileModel,
    private readonly profile: ProfileModel,
    private readonly user: UserModel,
  ) {}

  async findUserProfiles(id: string) {
    return await this.userProfile.findProfileByIdUser(id);
  }

  async profileSelectedUser(
    idProfile: string,
    idUser: string,
  ): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {
      const login = await this.userProfile.profileSelectedUser(
        idProfile,
        idUser,
      );

      if (!login)
        throw {
          message: `Não foi possivel fazer login com esse perfil!`,
          status: 500,
        };

      const user = await this.user.findUserById(idUser);
      const userProfile = await this.userProfile.findOneUserProfile(idProfile);
      const profileSelected = await this.profile.findOneById(
        userProfile.id_profile,
      );
      const token = jwt.sign(
        { idUser: user.id, idProfile: profileSelected.id },
        keyJwt.secret,
        {
          expiresIn: '3h',
        },
      );

      objectReturn.message = `Perfil selecionado com sucesso!`;
      objectReturn.data = {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
        profile: {
          name: profileSelected.name,
        },
      };
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
