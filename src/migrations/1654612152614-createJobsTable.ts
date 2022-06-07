import { MigrationInterface, QueryRunner } from "typeorm";

export class createJobsTable1654612152614 implements MigrationInterface {
    name = 'createJobsTable1654612152614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "job" character varying(50) NOT NULL, "specialty" character varying(50) NOT NULL, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "jobs"`);
    }

}
