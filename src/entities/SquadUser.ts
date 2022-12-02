import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Squad } from "./Squad";
import { User } from "./User";

@Entity('squadsUsers')
export class SquadUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'boolean'})
    leader: boolean

    @ManyToOne(() => Squad, squad => squad.members, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'squad_id'})
    squad: Squad

    @ManyToOne(() => User, user => user.squads, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'user_id'})
    user: User
}