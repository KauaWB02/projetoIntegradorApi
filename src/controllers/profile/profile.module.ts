import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './service/profile/profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class controllersModule {}
