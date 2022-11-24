import { Request, Response } from "express";
import { squadRepository } from "../repositories/squadRepository";
import { squadUserRepository } from "../repositories/squadUserRepository";
import { userRepository } from "../repositories/userRepository";

export class SquadController {
    
    async createSquad(req: Request, res: Response) {

        let {userEmail, name, description, minAge, minRank, maxMembers} = req.body

        try {

            if(maxMembers > 99){
                maxMembers = 99
            }

            if(minAge > 99){
                minAge = 99
            }
            
            const user = await userRepository.findUserByEmail(userEmail)

            if(!user.email){
                return res.status(400).json({message: "Ocorreu um erro, tente novamente mais tarde"})
            }

            const newSquad = squadRepository.create({name, description, minAge, minRank, maxMembers})

            await squadRepository.save(newSquad)

            const newSquadUser = squadUserRepository.create({squad: newSquad, user: user})
            await squadUserRepository.save(newSquadUser)

            return res.status(201).json(newSquad)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async getSquads(req: Request, res: Response) {

        try {
            
            return res.status(200).json(await squadRepository.find({
                relations: {
                    members: true
                 }
            }))
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async getSquadsByUserId(req: Request, res: Response) {

        const { userId } = req.params

        try {
            
            
        } catch (error) {

            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}