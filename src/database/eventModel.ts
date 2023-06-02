import { Repository } from 'typeorm';
import { AppDataSource } from './connection';
import { Injectable } from '@nestjs/common';
import { Events } from '../entity/Event';
import { IEvent } from '../interfaces/event/event.interface';

@Injectable()
export class EventModel {
  private conn: Repository<Events>;
  constructor() {
    this.conn = AppDataSource.getRepository(Events);
  }

  public async findAllEvents() :Promise<Events[]>{
    try {
      const events = await this.conn.find({
        relations: { user: true },
      }); console.log(events)

      return events;
    } catch (e) {
      console.log(e);
      throw {
        message: 'Ocorreu um erro ao tentar buscar por usuários',
        status: 500,
      };
    }
  }
  public async CreateEvents(body:IEvent) :Promise<Events>{
    try {
      const createEvents = this.conn.create({
        user_id:body.userId,
        amount_teams:body.amountTeams,
        description:body.description,
        description_switching:body.descriptionSwitching,
        dth_start:body.dthStart,
        title:body.title,
        first_place:body.firstPlace,
        second_place:body.secondPlace,
        third_place:body.thirdPlace,
      })
      const event = this.conn.save(createEvents)

      return event;
    } catch (e) {
      console.log(e);
      throw {
        message: 'Ocorreu um erro ao tentar buscar por usuários',
        status: 500,
      };
    }

  }
}
