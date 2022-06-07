import { MigrationInterface, QueryRunner } from "typeorm";

export class createAppointmentsTable1654613624756 implements MigrationInterface {
    name = 'createAppointmentsTable1654613624756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "anamnesis" character varying NOT NULL, "action" character varying(255) NOT NULL, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "appointments"`);
    }

}
