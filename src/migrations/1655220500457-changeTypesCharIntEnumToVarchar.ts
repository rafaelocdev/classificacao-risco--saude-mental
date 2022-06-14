import { MigrationInterface, QueryRunner } from "typeorm";

export class changeTypesCharIntEnumToVarchar1655220500457 implements MigrationInterface {
    name = 'changeTypesCharIntEnumToVarchar1655220500457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data" DROP CONSTRAINT "UQ_87465aba2ccd4e4a3c6a5918fbc"`);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "data" ADD "cpf" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data" ADD CONSTRAINT "UQ_87465aba2ccd4e4a3c6a5918fbc" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "data" ADD "gender" character varying(1) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "mobile"`);
        await queryRunner.query(`ALTER TABLE "data" ADD "mobile" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "zip"`);
        await queryRunner.query(`ALTER TABLE "data" ADD "zip" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "data" ADD "state" character varying(2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "job"`);
        await queryRunner.query(`DROP TYPE "public"."employees_job_enum"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "job" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "specialty"`);
        await queryRunner.query(`DROP TYPE "public"."employees_specialty_enum"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "specialty" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" DROP COLUMN "depression"`);
        await queryRunner.query(`DROP TYPE "public"."query_mh_risk_depression_enum"`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" ADD "depression" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "query_mh_risk" DROP COLUMN "depression"`);
        await queryRunner.query(`CREATE TYPE "public"."query_mh_risk_depression_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" ADD "depression" "public"."query_mh_risk_depression_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "specialty"`);
        await queryRunner.query(`CREATE TYPE "public"."employees_specialty_enum" AS ENUM('Psiquiatria', 'Admin')`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "specialty" "public"."employees_specialty_enum"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "job"`);
        await queryRunner.query(`CREATE TYPE "public"."employees_job_enum" AS ENUM('Enfermeiro(a)', 'Médico(a)', 'Administrador(a)')`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "job" "public"."employees_job_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "data" ADD "state" character(2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "zip"`);
        await queryRunner.query(`ALTER TABLE "data" ADD "zip" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "mobile"`);
        await queryRunner.query(`ALTER TABLE "data" ADD "mobile" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "data" ADD "gender" character(1) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data" DROP CONSTRAINT "UQ_87465aba2ccd4e4a3c6a5918fbc"`);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "data" ADD "cpf" character(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data" ADD CONSTRAINT "UQ_87465aba2ccd4e4a3c6a5918fbc" UNIQUE ("cpf")`);
    }

}
