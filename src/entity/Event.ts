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

  @Column({ name: 'dth_start' })
  dthStart: Date;

  @Column({ name: 'description_switching' })
  descriptionSwitching: string;

  @Column({ name: 'amount_teams' })
  amountTeams: number;

  @Column({ name: 'first_place' })
  firstPlace: string;

  @Column({ name: 'second_place' })
  secondPlace: string;

  @Column({ name: 'third_place' })
  thirdPlace: string;

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
