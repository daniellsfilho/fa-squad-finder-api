import { Request, Response } from "express";
import { Invitation } from "../entities/Invitation";
import { invitationRepository } from "../repositories/invitationRepository";
import { squadRepository } from "../repositories/squadRepository";
import { squadUserRepository } from "../repositories/squadUserRepository";
import { userRepository } from "../repositories/userRepository";

export class InvitationController {
    async createInvitation(req: Request, res: Response) {

        const { title, body } = req.body
        const { squadId, userId } = req.params

        try {
            
            const squad = await squadRepository.findOneBy({
                id: parseInt(squadId)
            })

            const user = await userRepository.findOneBy({
                id: parseInt(userId)
            })

            if(!squad) {
                return res.status(404).json({message: "Squad não existe"})
            }

            if(!user){
                return res.status(404).json({message: "Usuário não existe"})
            }

            const newInvitation = invitationRepository.create({
                title,
                body,
                user,
                squad
            })

            await invitationRepository.save(newInvitation)

            return res.status(201).json(newInvitation)

        } catch (error) {
            console.log(error)
            return res.status(500).json("Internal Server Error")
        }
    }

    async getInvitations(req: Request, res: Response) {

        try {
            
            return res.status(200).json(await invitationRepository.find())
        } catch (error) {
            console.log(error)
            return res.status(500).json("Internal Server Error")
        }
    }

    async getInvitationsByUserId(req: Request, res:Response) {

        const { userId } = req.params

        try {
            const allInvitations = await invitationRepository.find({
                relations:{
                    squad: true,
                    user: true
                }
            })

            const userInvitations: Invitation[] = []

            allInvitations.forEach((invitation: Invitation) => {
                if(invitation.user.id == parseInt(userId)){
                    userInvitations.push(invitation)
                }
            })

            return res.status(200).json(userInvitations)

        } catch (error) {
            console.log(error)
            return res.status(500).json("Internal Server Error")
        }
    }

    async acceptInvitation(req:Request, res: Response){

        const { id } = req.params

        try {
            
            const inviId = parseInt(id)

            const invitation = await invitationRepository.findInviByIdWithRelations(inviId)

            if(!invitation.title){
                return res.status(400).json({message: "Convite não existe"})
            }

            const user = invitation.user
            const squad = invitation.squad

            const squadVerification = await squadRepository.findOneByIdWithRelations(squad.id)

            if(squadVerification.members.length >= squadVerification.maxMembers){
                return res.status(400).json({message: "Squad cheio!"})
            }

            const newSquadUser = squadUserRepository.create({
                user,
                squad,
                leader: false
            })

            await squadUserRepository.save(newSquadUser)

            await invitationRepository.delete(invitation)

            return res.status(200).json(newSquadUser)

        } catch (error) {
            
            console.log(error)
            return res.status(500).json("Internal Server Error")
        }
    }

    async declineInvitation(req: Request, res: Response){

        const { id } = req.params

        try {
            
            const invitation = await invitationRepository.findOneBy({
                id: parseInt(id)
            })

            if(!invitation){
                return res.status(400).json({message: "Convite não existe"})
            }

            await invitationRepository.delete(invitation)
            return res.status(200).json({message: "Convite deletado"})

        } catch (error) {
            console.log(error)
            return res.status(500).json("Internal Server Error")
        }
    }
}