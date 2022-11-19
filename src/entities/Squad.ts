import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Invitation } from "./Invitation";
import { SquadUser } from "./SquadUser";
import { User } from "./User";

@Entity('squads')
export class Squad { 
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    name: string

    @Column({type: 'text'})
    description: string

    @Column({type: 'int'})
    minAge: number

    @Column({type: 'text'})
    minRank: string

    @OneToMany(() => SquadUser, user => user.squad)
    members: SquadUser[]

    @OneToMany(() => Invitation, invitation => invitation.squad)
    invitations: Invitation[]
}