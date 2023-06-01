import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Users } from './User';

@Entity()
export class Events {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dth_start: Date;

  @Column()
  description_switching: string;

  @Column()
  amount_teams: number;

  @Column()
  FIRST_PLACE: string;

  @Column()
  second_place: string;

  @Column()
  third_place: string;

  @Column()
  ended: string;

  @Column({ name: 'ended_at' })
  endedAt: Date;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
