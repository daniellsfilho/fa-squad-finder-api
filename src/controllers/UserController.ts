import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

export class UserController {

    async createUser(req: Request, res: Response){

        const user = req.body

        try {
            const newUser = userRepository.create(user)

            await userRepository.save(newUser)

            return res.status(201).json(newUser)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    async getUsers(req: Request, res: Response){
        
    }
}