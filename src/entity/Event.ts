import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity()
export class Event {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  id_user: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dth_start: Date;

  @Column()
  description_switching: string;

  @Column()
  amount_teams: string;

  @Column()
  first_place: string;

  @Column()
  second_teams: string;

  @Column()
  third_teams: string;

  @Column()
  ended: string;

  @Column()
  ended_at: Date;

  @Column()
  created_at: Date;

  @Column()
  update_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
