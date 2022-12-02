import { Request, Response } from "express";
import { Squad } from "../entities/Squad";
import { SquadUser } from "../entities/SquadUser";
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

            const newSquadUser = squadUserRepository.create({squad: newSquad, user: user, leader: true})
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
            
            const id = parseInt(userId)

            const user = await userRepository.findUserById(id)

            const userSquadsUsers = user.squads

            const userSquads: Squad[] = []

            const squads = await squadRepository.find({
                relations: {
                    members: true
                }
            })

            squads.forEach((squad: Squad) => {
                const squadMembers = squad.members
                squadMembers.forEach((member: SquadUser) => {
                    userSquadsUsers.forEach((squadUser: SquadUser) => {
                        if(member.id == squadUser.id){
                            userSquads.push(squad)
                        }
                    })
                }) 
            })

            return res.status(200).json(userSquads)
            
        } catch (error) {

            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async getSquadsByName(req: Request, res: Response){

        const { name } = req.params

        try {
            const squads = await squadRepository.findSquadsByName(name)
            return res.status(200).json(squads)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async deleteSquad(req: Request, res: Response){

        const { userId, squadId } = req.params

        try {
            
            const squad = await squadRepository.findOneByIdWithRelations(parseInt(squadId))
            const user = await userRepository.findUserById(parseInt(userId))

            if(!squad.id || !user.id){
                return res.status(404).json({message: "Usuário ou Squad não existem"})
            }

            const squadMembers = squad.members
            const userSquads = user.squads

            let selectedMember = new SquadUser()

            squadMembers.forEach(member => {
                userSquads.forEach(userSquad => {
                    if(member.id == userSquad.id){
                        selectedMember = member
                    }
                })
            })

            if(!selectedMember.id){
                return res.status(404).json({message: "Membro não existe"})
            }

            if(selectedMember.leader == false){
                return res.status(400).json({message: "Você não tem permissão para essa ação"})
            } else {
                squadMembers.forEach(async (member) => {
                    await squadUserRepository.delete(member)
                })
                await squadRepository.delete(squad)
            }

            
            return res.status(200).json({message: "Squad deletado"})

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async updateSquad(req: Request, res: Response) {

        const squadUpdate = req.body
        const { squadId } = req.params

        try {
            
            const squad = await squadRepository.findOneByIdWithRelations(parseInt(squadId))

            if(!squad.id){
                return res.status(404).json({message: "Squad não encontrado"})
            }

            squad.name = squadUpdate.name
            squad.description = squadUpdate.description
            squad.minAge = squadUpdate.minAge
            squad.minRank = squadUpdate.minRank
            squad.maxMembers = squadUpdate.maxMembers

            await squadRepository.save(squad)

            return res.status(200).json(squad)

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}