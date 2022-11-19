import { AppDataSource } from "../data-source";
import { SquadUser } from "../entities/SquadUser";

export const squadUserRepository = AppDataSource.getRepository(SquadUser)