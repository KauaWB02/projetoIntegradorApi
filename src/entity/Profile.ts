import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as UUID } from 'uuid';
import { Users } from './User';
import { User_Profile } from './User_Profile';

@Entity()
export class Profile {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToMany(() => User_Profile, (p) => p.profile)
  @JoinColumn({ name: 'id_user' })
  profile: User_Profile[];

  constructor() {
    if (!this.id) {
      this.id = UUID();
    }
  }
}
