import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Users } from './User';
import { v4 as UUID } from 'uuid';

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

  @OneToMany(() => Users, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  users: Users[];

  constructor() {
    if (!this.id) {
      this.id = UUID();
    }
  }
}
