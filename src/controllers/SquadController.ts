import { Request, Response } from "express";
import { squadRepository } from "../repositories/squadRepository";

export class SquadController {
    
    async createSquad(req: Request, res: Response) {

        const squad = req.body

        try {
            
            const newSquad = squadRepository.create(squad)

            await squadRepository.save(newSquad)

            return res.status(201).json(newSquad)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}