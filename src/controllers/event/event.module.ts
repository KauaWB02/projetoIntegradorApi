import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './service/event/event.service';
import { EventModel } from '../../database/eventModel';

@Module({
  controllers: [EventController],
  providers: [EventService, EventModel],
})
export class EventModule {}
