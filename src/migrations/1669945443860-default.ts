import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669945443860 implements MigrationInterface {
    name = 'default1669945443860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "squadsUsers" ADD "leader" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "squadsUsers" DROP COLUMN "leader"`);
    }

}
