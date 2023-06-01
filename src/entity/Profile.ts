import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm"
import { v4 as UUID } from "uuid";
import { Users } from "./User";

@Entity()
export class Profile {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => Users, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    users: Users[];

    constructor() {
        if (!this.id) {
            this.id = UUID();
        }
    }
}
