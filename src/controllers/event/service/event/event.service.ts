import { HttpException, Injectable } from '@nestjs/common';
import { IReturn } from '../../../../interfaces/return.interface';
import { EventModel } from '../../../../database/eventModel';
import { IEvent } from '../../../../interfaces/event/event.interface';

@Injectable()
export class EventService {
  constructor(private readonly modelEvent: EventModel) { }

  async findAllEvents(): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {
      const events = await this.modelEvent.findAllEvents();
      const eventData: IEvent[] = []

      events.map((objEvents) => {
        const templateObject: IEvent = {
          id: objEvents.id,
          userId: objEvents.user_id,
          title: objEvents.title,
          description: objEvents.description,
          dthStart: objEvents.dth_start,
          descriptionSwitching: objEvents.description_switching,
          amountTeams: objEvents.amount_teams,
          firstPlace: objEvents.first_place,
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
        eventData.push(templateObject);
      });
      objectReturn.message = 'Listando Eventos!';
      objectReturn.data = eventData;
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
  async CreateEvent(body: IEvent): Promise<IReturn> {
    const objectReturn: IReturn = {
      message: '',
      data: [],
    };
    try {
      const {
        userId,
        title,
        description,
        dthStart,
        descriptionSwitching,
        amountTeams,
        firstPlace,
        secondPlace,
        thirdPlace,
      } = body

      if (!userId) throw {
        message: `campo "userId" Obrigatório`,
        status: 400
      }

      if (!title) throw {
        message: `campo "title" Obrigatório`,
        status: 400
      }
      if (!description) throw {
        message: `campo "description" Obrigatório`,
        status: 400
      }
      if (!dthStart) throw {
        message: `campo "dthStart" Obrigatório`,
        status: 400
      }
      if (!descriptionSwitching) throw {
        message: `campo "descriptionSwitching" Obrigatório`,
        status: 400
      }
      if (!amountTeams) throw {
        message: `campo "amountTeams" Obrigatório`,
        status: 400
      }
      const createEvents = await this.modelEvent.CreateEvents(body);
      objectReturn.message = 'Evento Cadastrado Com Sucesso!!'
      objectReturn.data = {
        id: createEvents.id,
        userId: createEvents.user_id,
        title: createEvents.title,
        description: createEvents.description,
        dthStart: createEvents.dth_start,
        descriptionSwitching: createEvents.description_switching,
        amountTeams: createEvents.amount_teams,
        firstPlace: createEvents.first_place,
        secondPlace: createEvents.second_place,
        thirdPlace: createEvents.third_place,
        ended: createEvents.ended,
        endedAt: createEvents.endedAt,
        createdAt: createEvents.createdAt,
        updatedAt: createEvents.updatedAt,
      }
      return objectReturn

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
