import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668830123941 implements MigrationInterface {
    name = 'default1668830123941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "userName" text NOT NULL, "email" text NOT NULL, "age" integer NOT NULL, "rating" double precision NOT NULL, "photo" text NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "squadsUsers" ("id" SERIAL NOT NULL, "squad_id" integer, "user_id" integer, CONSTRAINT "PK_def5a9a958fd23c1b49b53a3d1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "squads" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "minAge" integer NOT NULL, "minRank" text NOT NULL, CONSTRAINT "PK_6ef0717a3dbb0f326bc387dfacb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "squadsUsers" ADD CONSTRAINT "FK_bbad0badfc187371b81d3db7a95" FOREIGN KEY ("squad_id") REFERENCES "squads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "squadsUsers" ADD CONSTRAINT "FK_5525fcfd94e018e0d08dcb8739d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "squadsUsers" DROP CONSTRAINT "FK_5525fcfd94e018e0d08dcb8739d"`);
        await queryRunner.query(`ALTER TABLE "squadsUsers" DROP CONSTRAINT "FK_bbad0badfc187371b81d3db7a95"`);
        await queryRunner.query(`DROP TABLE "squads"`);
        await queryRunner.query(`DROP TABLE "squadsUsers"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
