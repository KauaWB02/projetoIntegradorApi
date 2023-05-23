import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity()
export class User {
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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
