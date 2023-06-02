import { Module } from '@nestjs/common';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './service/profile/userProfile.service';
import { userProfileModel } from '../../database/userProfile';

@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService, userProfileModel],
})
export class UserProfileModule {}
