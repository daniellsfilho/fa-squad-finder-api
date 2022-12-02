import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669946773984 implements MigrationInterface {
    name = 'default1669946773984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "squadsUsers" DROP CONSTRAINT "FK_bbad0badfc187371b81d3db7a95"`);
        await queryRunner.query(`ALTER TABLE "squadsUsers" DROP CONSTRAINT "FK_5525fcfd94e018e0d08dcb8739d"`);
        await queryRunner.query(`ALTER TABLE "squadsUsers" ADD CONSTRAINT "FK_bbad0badfc187371b81d3db7a95" FOREIGN KEY ("squad_id") REFERENCES "squads"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "squadsUsers" ADD CONSTRAINT "FK_5525fcfd94e018e0d08dcb8739d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "squadsUsers" DROP CONSTRAINT "FK_5525fcfd94e018e0d08dcb8739d"`);
        await queryRunner.query(`ALTER TABLE "squadsUsers" DROP CONSTRAINT "FK_bbad0badfc187371b81d3db7a95"`);
        await queryRunner.query(`ALTER TABLE "squadsUsers" ADD CONSTRAINT "FK_5525fcfd94e018e0d08dcb8739d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "squadsUsers" ADD CONSTRAINT "FK_bbad0badfc187371b81d3db7a95" FOREIGN KEY ("squad_id") REFERENCES "squads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
