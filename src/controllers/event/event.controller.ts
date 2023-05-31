import { Controller, Get } from '@nestjs/common';
import { IReturn } from '../../interfaces/return.interface';
import { EventService } from './service/event/event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAllEvents(): Promise<IReturn> {
    return this.eventService.findAllEvents();
  }
}
