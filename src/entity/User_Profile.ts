import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as UUID } from 'uuid';
import { Users } from './User';
import { Profile } from './Profile';

@Entity()
export class User_Profile {
  @PrimaryColumn()
  id: string;

  @Column()
  id_user: string;

  @Column()
  id_profile: string;

  @Column()
  active: boolean;

  @Column()
  status: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.profiles)
  @JoinColumn({ name: 'id_user' })
  user: Users;

  @ManyToOne(() => Profile, (p) => p.profile)
  @JoinColumn({ name: 'id_profile' })
  profile: Profile;

  constructor() {
    if (!this.id) {
      this.id = UUID();
    }
  }
}
