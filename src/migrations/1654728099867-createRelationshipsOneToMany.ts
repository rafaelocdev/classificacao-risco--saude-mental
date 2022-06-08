import { MigrationInterface, QueryRunner } from "typeorm";

export class createRelationshipsOneToMany1654728099867 implements MigrationInterface {
    name = 'createRelationshipsOneToMany1654728099867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "query_mh_risk" ADD "client_id" uuid`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" ADD "result_mh_risk_id" character varying`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "on_duty_id" uuid`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" ADD CONSTRAINT "FK_3a26f849a0c6229819f1cdef9e8" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" ADD CONSTRAINT "FK_15a70df7c654903f5636bc51134" FOREIGN KEY ("result_mh_risk_id") REFERENCES "result_mh_risk"("risk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_8116581e90af53235660de94bf3" FOREIGN KEY ("on_duty_id") REFERENCES "on_duty"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_8116581e90af53235660de94bf3"`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" DROP CONSTRAINT "FK_15a70df7c654903f5636bc51134"`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" DROP CONSTRAINT "FK_3a26f849a0c6229819f1cdef9e8"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "on_duty_id"`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" DROP COLUMN "result_mh_risk_id"`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" DROP COLUMN "client_id"`);
    }

}
