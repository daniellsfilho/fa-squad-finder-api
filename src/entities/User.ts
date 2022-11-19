import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Invitation } from "./Invitation";
import { SquadUser } from "./SquadUser";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    name: string

    @Column({type: 'text'})
    userName: string

    @Column({type: 'text'})
    email: string

    @Column({type: 'int'})
    age: number

    @Column({type: 'float'})
    rating: number

    @Column({type: 'text'})
    photo: string

    @OneToMany(() => SquadUser, squad => squad.user)
    squads: SquadUser[]

    @OneToMany(() => Invitation, invitation => invitation.user)
    invitations: Invitation[]
}