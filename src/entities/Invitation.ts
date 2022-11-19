import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Squad } from "./Squad";
import { User } from "./User";

@Entity('invitations')
export class Invitation {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type: 'text'})
    title: string

    @Column({type: 'text'})
    body: string

    @ManyToOne(() => User, user => user.invitations)
    @JoinColumn({name: 'user_id'})
    user: User

    @ManyToOne(() => Squad, squad => squad.invitations)
    @JoinColumn({name: 'squad_id'})
    squad: Squad
}