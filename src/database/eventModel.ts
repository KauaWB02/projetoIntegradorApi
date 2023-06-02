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

  public async findAllEvents() {
    try {
      const events = await this.conn.find({
        relations: { user: true },
      });

      return events;
    } catch (e) {
      console.log(e);
      throw {
        message: 'Ocorreu um erro ao tentar buscar por usuários',
        status: 500,
      };
    }
  }
}
