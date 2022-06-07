import { MigrationInterface, QueryRunner } from "typeorm";

export class createOnDutyTable1654611926297 implements MigrationInterface {
    name = 'createOnDutyTable1654611926297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "on_duty" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "on_duty" boolean NOT NULL, "available" boolean NOT NULL, CONSTRAINT "PK_83937bf600f1bf514081360b9db" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "on_duty"`);
    }

}
