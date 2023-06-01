import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProfileService } from './service/profile/profile.service';
import { IProfile } from '../../interfaces/profile/profile';
import { IReturn } from '../../interfaces/return.interface';

@Controller('profile')
export class ProfileController {
  constructor(private readonly serviceProfile: ProfileService) { }

  @Get()
  async findAllProfiles(): Promise<IReturn> {
    return this.serviceProfile.findAllProfiles();
  }

  @Get()
  async findOneById(@Query('idProfile') id: string): Promise<IReturn> {
    return this.serviceProfile.findOneById(id)
  }

  @Post('create')
  async createProfule(@Body() body: IProfile): Promise<IReturn> {
    return this.serviceProfile.createProfile(body);
  }

  @Put('update/:idProfile')
  async updateProfile(@Param('idProfile') idProfile: string, @Body() body: IProfile): Promise<IReturn> {
    return this.serviceProfile.updateProfile(idProfile, body);
  }

  @Delete('delete/:idProfile')
  async deleteProfile(@Param('idProfile') idProfile: string): Promise<IReturn> {
    return this.serviceProfile.deleteProfile(idProfile);
  }

}
