import { Body, Controller, Get, Post } from '@nestjs/common';
import { IReturn } from '../../interfaces/return.interface';
import { EventService } from './service/event/event.service';
import { IEvent } from '../../interfaces/event/event.interface';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Get()
  async getAllEvents(): Promise<IReturn> {
    return this.eventService.findAllEvents();
  }
  @Post('create')
  async createEvent(@Body() body: IEvent): Promise<IReturn> {
    return this.eventService.CreateEvent(body);
  }

}
