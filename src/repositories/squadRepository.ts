import { AppDataSource } from "../data-source";
import { Squad } from "../entities/Squad";

export const squadRepository = AppDataSource.getRepository(Squad).extend({
    async findOneByIdWithRelations(id: number){
        const squads = await this.find({
            relations: {
                members: true
            }
        })

        let selectedSquad: Squad = new Squad()

        squads.forEach((squad: Squad) => {
            if (squad.id == id){
                selectedSquad = squad
            }
        })

        return selectedSquad
    }
})