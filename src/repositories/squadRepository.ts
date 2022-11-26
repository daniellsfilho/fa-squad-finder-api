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
    },

    async findSquadsByName(name: string){
        const squads: Squad[] = await this.find({
            relations: {
                members: true
            }
        })

        const selectedSquads: Squad[] = []

        const lowerCaseName = name.toLowerCase()

        squads.forEach((squad: Squad) => {
            const squadName = squad.name.toLowerCase()
            if(squadName.includes(lowerCaseName)){
                selectedSquads.push(squad)
            }
        })

        return selectedSquads
    }
})