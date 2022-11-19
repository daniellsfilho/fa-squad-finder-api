import { AppDataSource } from "../data-source";
import { Invitation } from "../entities/Invitation";

export const invitationRepository = AppDataSource.getRepository(Invitation)