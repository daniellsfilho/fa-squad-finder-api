import { Request, Response } from "express";
import { invitationRepository } from "../repositories/invitationRepository";
import { squadRepository } from "../repositories/squadRepository";
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

            res.status(201).json(newInvitation)

        } catch (error) {
            console.log(error)
            res.status(500).json("Internal Server Error")
        }
    }
}