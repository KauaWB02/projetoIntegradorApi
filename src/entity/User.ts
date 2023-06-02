import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Events } from './Event';
import { User_Profile } from './User_Profile';

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

  @OneToMany(() => Events, (event) => event.user)
  @JoinColumn({ name: 'user_id' })
  events: Events[];

  @OneToMany(() => User_Profile, (p) => p.user)
  @JoinColumn({ name: 'id_user' })
  profiles: User_Profile[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
