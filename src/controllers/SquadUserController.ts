import { Request, Response } from "express";
import { SquadUser } from "../entities/SquadUser";
import { User } from "../entities/User";
import { squadRepository } from "../repositories/squadRepository";
import { squadUserRepository } from "../repositories/squadUserRepository";
import { userRepository } from "../repositories/userRepository";

export class SquadUserController {
    async createSquadUser(req: Request, res: Response) {
        const {squadId, userId} = req.params

        try {

            const squad = await squadRepository.findOneByIdWithRelations(parseInt(squadId))

            const user = await userRepository.findOneBy({
                id: parseInt(userId)
            })

            const squadsUsers = await squadUserRepository.find({
                relations: {
                    squad: true,
                    user: true
                }
            })

            if(!squad) {
                return res.status(404).json({message: "Squad não existe"})
            }

            if(!user){
                return res.status(404).json({message: "Usuário não existe"})
            }

            const squadMembers = squad.members
            
            let userExists = false
            
            if(squadMembers.length > 0 && squadsUsers.length > 0){
                squadMembers.forEach((member: SquadUser) => {
                    squadsUsers.forEach((squadUser: SquadUser) => {
                        if(squadUser.id == member.id){
                            if(squadUser.user.id == user.id){
                                userExists = true
                            }
                        }
                    })
                })
            }

            if(userExists){
                return res.status(400).json({message: "Usuário já está no esquadrão"})
            } else {
                const newSquadUser = squadUserRepository.create({
                    squad,
                    user
                })
    
                await squadUserRepository.save(newSquadUser)
    
                return res.status(201).json(newSquadUser)
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async getSquadsUsers(req: Request, res: Response) {

        try {
            
            return res.status(200).json(await squadUserRepository.find())
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}