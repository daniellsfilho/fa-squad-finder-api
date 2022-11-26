import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const userRepository = AppDataSource.getRepository(User).extend({
    async findUserByEmail(email: string){

        const users = await this.find()

        let selectedUser: User = new User()

        users.forEach((user: User) => {
            if(user.email == email){
                selectedUser = user
            }
        })

        return selectedUser
    },

    async findUserById(id: number){

        const users = await this.find({
            relations: {
                squads: true
            }
        })

        let selectedUser: User = new User()

        users.forEach((user: User) => {
            if(user.id == id){
                selectedUser = user
            }
        })

        return selectedUser
    }
})