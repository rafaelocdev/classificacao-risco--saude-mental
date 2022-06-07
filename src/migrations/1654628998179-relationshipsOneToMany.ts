import { MigrationInterface, QueryRunner } from "typeorm";

export class relationshipsOneToMany1654628998179 implements MigrationInterface {
    name = 'relationshipsOneToMany1654628998179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "job_id" uuid`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" ADD "client_id" uuid`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "on_duty_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_4d354377b20055b24f8ec430bd5" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" ADD CONSTRAINT "FK_3a26f849a0c6229819f1cdef9e8" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_8116581e90af53235660de94bf3" FOREIGN KEY ("on_duty_id") REFERENCES "on_duty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_8116581e90af53235660de94bf3"`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" DROP CONSTRAINT "FK_3a26f849a0c6229819f1cdef9e8"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_4d354377b20055b24f8ec430bd5"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "on_duty_id"`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "job_id"`);
    }

}
