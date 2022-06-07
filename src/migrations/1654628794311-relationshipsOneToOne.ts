import { MigrationInterface, QueryRunner } from "typeorm";

export class relationshipsOneToOne1654628794311 implements MigrationInterface {
    name = 'relationshipsOneToOne1654628794311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" ADD "query_mh_risk_id" uuid`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "UQ_a6e509779614c9ffb1cb7ad7c23" UNIQUE ("query_mh_risk_id")`);
        await queryRunner.query(`ALTER TABLE "on_duty" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "on_duty" ADD CONSTRAINT "UQ_c702b66ce048e0256c47cc119df" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "data" ADD "customer_id" uuid`);
        await queryRunner.query(`ALTER TABLE "data" ADD CONSTRAINT "UQ_cea44e1e04352b53ac2cb1cdc35" UNIQUE ("customer_id")`);
        await queryRunner.query(`ALTER TABLE "data" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "data" ADD CONSTRAINT "UQ_67f4e9159342cf6840efece7aaf" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_a6e509779614c9ffb1cb7ad7c23" FOREIGN KEY ("query_mh_risk_id") REFERENCES "query_mh_risk"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "on_duty" ADD CONSTRAINT "FK_c702b66ce048e0256c47cc119df" FOREIGN KEY ("user_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "data" ADD CONSTRAINT "FK_cea44e1e04352b53ac2cb1cdc35" FOREIGN KEY ("customer_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "data" ADD CONSTRAINT "FK_67f4e9159342cf6840efece7aaf" FOREIGN KEY ("user_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data" DROP CONSTRAINT "FK_67f4e9159342cf6840efece7aaf"`);
        await queryRunner.query(`ALTER TABLE "data" DROP CONSTRAINT "FK_cea44e1e04352b53ac2cb1cdc35"`);
        await queryRunner.query(`ALTER TABLE "on_duty" DROP CONSTRAINT "FK_c702b66ce048e0256c47cc119df"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_a6e509779614c9ffb1cb7ad7c23"`);
        await queryRunner.query(`ALTER TABLE "data" DROP CONSTRAINT "UQ_67f4e9159342cf6840efece7aaf"`);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "data" DROP CONSTRAINT "UQ_cea44e1e04352b53ac2cb1cdc35"`);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "customer_id"`);
        await queryRunner.query(`ALTER TABLE "on_duty" DROP CONSTRAINT "UQ_c702b66ce048e0256c47cc119df"`);
        await queryRunner.query(`ALTER TABLE "on_duty" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "UQ_a6e509779614c9ffb1cb7ad7c23"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "query_mh_risk_id"`);
    }

}
