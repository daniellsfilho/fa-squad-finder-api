import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Squad } from "./Squad";
import { User } from "./User";

@Entity('squadsUsers')
export class SquadUser {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Squad, squad => squad.members)
    @JoinColumn({name: 'squad_id'})
    squad: Squad

    @ManyToOne(() => User, user => user.squads)
    @JoinColumn({name: 'user_id'})
    user: User
}