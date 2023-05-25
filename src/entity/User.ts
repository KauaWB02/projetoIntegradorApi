import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

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
  deleted_user: string;

  @Column()
  type: string;

  @Column()
  deleted_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
