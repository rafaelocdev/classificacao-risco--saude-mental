import { MigrationInterface, QueryRunner } from "typeorm";

export class createRelationshipsOneToOne1654722605540 implements MigrationInterface {
    name = 'createRelationshipsOneToOne1654722605540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "data_id" uuid`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_0905bbabdf4fb87584a45d2b821" UNIQUE ("data_id")`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "query_mh_risk_id" uuid`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "UQ_a6e509779614c9ffb1cb7ad7c23" UNIQUE ("query_mh_risk_id")`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "data_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "UQ_9d6a984962f1ed664423451e565" UNIQUE ("data_id")`);
        await queryRunner.query(`ALTER TABLE "on_duty" ADD "employee_id" uuid`);
        await queryRunner.query(`ALTER TABLE "on_duty" ADD CONSTRAINT "UQ_e776196af7b554e794aed423495" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_0905bbabdf4fb87584a45d2b821" FOREIGN KEY ("data_id") REFERENCES "data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_a6e509779614c9ffb1cb7ad7c23" FOREIGN KEY ("query_mh_risk_id") REFERENCES "query_mh_risk"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_9d6a984962f1ed664423451e565" FOREIGN KEY ("data_id") REFERENCES "data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "on_duty" ADD CONSTRAINT "FK_e776196af7b554e794aed423495" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "on_duty" DROP CONSTRAINT "FK_e776196af7b554e794aed423495"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_9d6a984962f1ed664423451e565"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_a6e509779614c9ffb1cb7ad7c23"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_0905bbabdf4fb87584a45d2b821"`);
        await queryRunner.query(`ALTER TABLE "on_duty" DROP CONSTRAINT "UQ_e776196af7b554e794aed423495"`);
        await queryRunner.query(`ALTER TABLE "on_duty" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "UQ_9d6a984962f1ed664423451e565"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "data_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "UQ_a6e509779614c9ffb1cb7ad7c23"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "query_mh_risk_id"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_0905bbabdf4fb87584a45d2b821"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "data_id"`);
    }

}
