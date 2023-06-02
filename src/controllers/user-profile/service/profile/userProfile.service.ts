import { Injectable } from '@nestjs/common';
import { userProfileModel } from '../../../../database/userProfile';

@Injectable()
export class UserProfileService {
  constructor(private readonly userProfileModel: userProfileModel) {}

  async findUserProfiles(id: string) {
    return await this.userProfileModel.findProfileByIdUser(id);
  }

  async profileSelectedUser(idProfile: string, idUser: string) {
    return await this.userProfileModel.profileSelectedUser(idProfile, idUser);
  }
}
