import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668831026570 implements MigrationInterface {
    name = 'default1668831026570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invitations" ("id" SERIAL NOT NULL, "title" text NOT NULL, "body" text NOT NULL, "user_id" integer, "squad_id" integer, CONSTRAINT "PK_5dec98cfdfd562e4ad3648bbb07" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD CONSTRAINT "FK_fecdffec754fa4d5cea98709776" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD CONSTRAINT "FK_5541eec9410a0ed3aa50cecfffd" FOREIGN KEY ("squad_id") REFERENCES "squads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitations" DROP CONSTRAINT "FK_5541eec9410a0ed3aa50cecfffd"`);
        await queryRunner.query(`ALTER TABLE "invitations" DROP CONSTRAINT "FK_fecdffec754fa4d5cea98709776"`);
        await queryRunner.query(`DROP TABLE "invitations"`);
    }

}
