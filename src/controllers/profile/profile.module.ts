import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './service/profile/profile.service';
import { ProfileModel } from '../../database/profileModel';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, ProfileModel],
})
export class ProfileModules { }
