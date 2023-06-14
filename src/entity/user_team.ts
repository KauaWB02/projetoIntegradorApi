import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as UUID } from 'uuid';

@Entity()
export class user_team {

    @PrimaryColumn()
    id: string;

    @Column()
    id_team: string;

    @Column()
    id_user: string;

    @Column()
    accept: number;


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
