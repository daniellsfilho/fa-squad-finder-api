import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

export class UserController {

    async createUser(req: Request, res: Response) {

        const user = req.body

        try {
            const newUser = userRepository.create(user)

            await userRepository.save(newUser)

            return res.status(201).json(newUser)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async getUsers(req: Request, res: Response) {

        try {
            return res.status(200).json(await userRepository.find())
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async getUserByEmail(req: Request, res: Response) {

        const { email } = req.body

        try {
            
            const user = await userRepository.findUserByEmail(email)

            return res.status(200).json(user)

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }  
}