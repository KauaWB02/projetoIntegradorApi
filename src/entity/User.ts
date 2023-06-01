import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Events } from './Event';

@Entity()
export class Users {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  deleted_at: string;

  @OneToMany(() => Events, (event) => event.user_id)
  @JoinColumn({ name: 'user_id' })
  events: Events[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
