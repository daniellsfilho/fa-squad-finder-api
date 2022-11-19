import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    name: "SquadFinder",
    type: "postgres",
    password: "CqSPbyCKu5DZzDR5Hnh4I6vpAWO4iQk2",
    url: "postgres://zpuozcva:CqSPbyCKu5DZzDR5Hnh4I6vpAWO4iQk2@babar.db.elephantsql.com/zpuozcva",
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
})