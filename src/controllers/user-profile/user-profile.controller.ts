import { Controller, Get, Query } from '@nestjs/common';
import { UserProfileService } from './service/profile/userProfile.service';

@Controller('userProfile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get()
  getProfileUser(@Query('idUser') idUser: string) {
    return this.userProfileService.findUserProfiles(idUser);
  }

  @Get('profile/selected')
  profileSelectedUser(
    @Query('idProfile') idProfile: string,
    @Query('idUser') idUser: string,
  ) {
    return this.userProfileService.profileSelectedUser(idProfile, idUser);
  }
}
