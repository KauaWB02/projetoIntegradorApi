import { Module } from '@nestjs/common';
import { userModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { ProfileModules } from './profile/profile.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { TeamController } from './team/team.controller';
import { TeamModule } from './team/team.module';

@Module({
  imports: [userModule, EventModule, ProfileModules, UserProfileModule, TeamModule]
})
export class controllersModule {}
