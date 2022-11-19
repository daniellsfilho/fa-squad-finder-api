import { Request, Response } from "express";

export class UserController {
    async createUser(req: Request, res: Response){
        try {

            return res.json('funcionou!')
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
}