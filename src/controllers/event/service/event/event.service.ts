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
      // const events = await this.modelEvent.findAllEvents();

      // events.map((objEvents: IEvent) => {
      //   const templateObject: IEvent = {
      //     id: objEvents.id,
      //     title: objEvents.title,
      //     description: objEvents.description,
      //     dthStart: objEvents.dthStart,
      //     descriptionSwitching: objEvents.descriptionSwitching,
      //     amountTeams: objEvents.amountTeams,
      //     firstPlace: objEvents.firstPlace,
      //     secondPlace: objEvents.secondPlace,
      //     thirdPlace: objEvents.thirdPlace,
      //     ended: objEvents.ended,
      //     endedAt: objEvents.endedAt,
      //     createdAt: objEvents.createdAt,
      //     updatedAt: objEvents.updatedAt,
      //     user: {
      //       name: objEvents.user.name,
      //     },
      //   };
      //   events.push(templateObject);
      // });
      // objectReturn.message = 'Listando Eventos!';
      // objectReturn.data = events;
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
