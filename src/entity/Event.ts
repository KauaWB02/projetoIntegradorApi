import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Users } from './User';

@Entity()
export class Events {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

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
  second_place: string;

  @Column()
  third_place: string;

  @Column()
  ended: string;

  @Column()
  ended_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
