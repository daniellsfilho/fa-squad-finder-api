import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

export class UserController {

    async createUser(req: Request, res: Response) {

        const user = req.body

        try {

            const userCheck = await userRepository.findUserByEmail(user.email)

            if(userCheck.email){
                return res.status(200).json({message: "Usuário já existe!"})
            }

            const newUser = userRepository.create(user)

            await userRepository.save(newUser)

            return res.status(201).json(newUser)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async getUsersByName(req: Request, res: Response) {

        const {name} = req.params
        try {
            
            const lowerCaseName = name.toLowerCase()

            const selectedUsers: any[] = []
            const users = await userRepository.find()
            
            users.forEach(user => {
                const userName = user.userName.toLowerCase()
                if(userName.includes(lowerCaseName)){
                    selectedUsers.push(user)
                }
            })

            return res.status(200).json(selectedUsers)
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

        const { email } = req.params

        try {
            
            const user = await userRepository.findUserByEmail(email)

            if(!user.id){
                return res.status(400).json({message: "Usuário não existe"})
            }

            return res.status(200).json(user)

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }  

    async updateUser(req: Request, res: Response){

        const userUpdate = req.body
        try {

            const user = await userRepository.findUserByEmail(userUpdate.email)

            if(!user.userName){
                return res.status(400).json({message: "Parece que o usuário não existe, tente novamente com outro usuário"})
            }

            user.userName = userUpdate.userName
            user.age = userUpdate.age
            user.photo = userUpdate.photo

            await userRepository.save(user)

            return res.status(200).json(user)

        } catch(error){
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}