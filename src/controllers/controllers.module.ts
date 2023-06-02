import { Module } from '@nestjs/common';
import { userModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { ProfileModules } from './profile/profile.module';
import { UserProfileModule } from './user-profile/user-profile.module';
@Module({
  imports: [userModule, EventModule, ProfileModules, UserProfileModule],
})
export class controllersModule {}
