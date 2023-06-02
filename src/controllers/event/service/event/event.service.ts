import { HttpException, Injectable } from '@nestjs/common';
import { IReturn } from '../../../../interfaces/return.interface';
import { EventModel } from '../../../../database/eventModel';
import { IEvent } from '../../../../interfaces/event/event.interface';

@Injectable()
export class EventService {
  constructor(private readonly modelEvent: EventModel) {}

  async findAllEvents(): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {
      const events = await this.modelEvent.findAllEvents();
      const teste: Array<IEvent> = [];
      events.map((objEvents) => {
        const templateObject: IEvent = {
          id: objEvents.id,
          title: objEvents.title,
          description: objEvents.description,
          dthStart: objEvents.dth_start,
          descriptionSwitching: objEvents.description_switching,
          amountTeams: objEvents.amount_teams,
          firstPlace: objEvents.FIRST_PLACE,
          secondPlace: objEvents.second_place,
          thirdPlace: objEvents.third_place,
          ended: objEvents.ended,
          endedAt: objEvents.endedAt,
          createdAt: objEvents.createdAt,
          updatedAt: objEvents.updatedAt,
          user: {
            name: objEvents.user.name,
          },
        };
        teste.push(templateObject);
      });
      objectReturn.message = 'Listando Eventos!';
      objectReturn.data = events;
      return objectReturn;
    } catch (e) {
      throw new HttpException(
        {
          status: e.status,
          error: e.message,
        },
        e.status,
      );
    }
  }
}
