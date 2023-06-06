import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as UUID } from 'uuid';

@Entity()
export class team {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  leader: string;

  @Column()
  logo: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;




  constructor() {
    if (!this.id) {
      this.id = UUID();
    }
  }
}