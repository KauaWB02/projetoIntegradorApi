import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './service/event/event.service';

@Module({
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
