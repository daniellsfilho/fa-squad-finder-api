import { AppDataSource } from "../data-source";
import { Invitation } from "../entities/Invitation";

export const invitationRepository = AppDataSource.getRepository(Invitation).extend({
    async findInviByIdWithRelations(id: number){

        const invitations = await this.find({
            relations:{
                squad: true,
                user: true
            }
        })

        let selectedInvitation = new Invitation() 

        invitations.forEach((invitation: Invitation) => {
            if(invitation.id == id){
                selectedInvitation = invitation
            }
        })

        return selectedInvitation;
    }
})