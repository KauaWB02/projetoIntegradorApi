import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as UUID } from 'uuid';

@Entity()
export class team {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  leader: string;

  @Column()
  logo: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
    description: string;

  constructor() {
    if (!this.id) {
      this.id = UUID();
    }
  }
}