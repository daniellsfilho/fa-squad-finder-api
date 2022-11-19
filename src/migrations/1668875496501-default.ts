import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668875496501 implements MigrationInterface {
    name = 'default1668875496501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "squads" ADD "maxMembers" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "squads" DROP COLUMN "maxMembers"`);
    }

}
