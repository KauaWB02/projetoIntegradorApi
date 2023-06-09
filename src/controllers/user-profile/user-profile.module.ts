import { Module } from '@nestjs/common';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './service/profile/userProfile.service';
import { userProfileModel } from '../../database/userProfile';
import { ProfileModel } from '../../database/profileModel';
import { UserModel } from '../../database/userModel';

@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService, userProfileModel, ProfileModel, UserModel],
})
export class UserProfileModule {}
