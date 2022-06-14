import { MigrationInterface, QueryRunner } from "typeorm";

export class createAllTables1654722363585 implements MigrationInterface {
  name = "createAllTables1654722363585";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "anamnesis" character varying, "action" character varying(255), CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "subscription" integer NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cpf" character(11) NOT NULL, "birthday" character varying(20) NOT NULL, "gender" character(1) NOT NULL, "email" character varying(255) NOT NULL, "mobile" integer NOT NULL, "street" character varying(255) NOT NULL, "number" integer NOT NULL, "complement" character varying(50) NOT NULL, "zip" integer NOT NULL, "city" character varying(255) NOT NULL, "state" character(2) NOT NULL, CONSTRAINT "UQ_87465aba2ccd4e4a3c6a5918fbc" UNIQUE ("cpf"), CONSTRAINT "PK_2533602bd9247937e3a4861e173" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."employees_job_enum" AS ENUM('Enfermeiro(a)', 'Médico(a)', 'Administrador(a)')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."employees_specialty_enum" AS ENUM('Psiquiatria', 'Admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "password" character varying NOT NULL, "register" character varying(50) NOT NULL, "job" "public"."employees_job_enum" NOT NULL, "specialty" "public"."employees_specialty_enum", CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "on_duty" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "on_duty" boolean NOT NULL DEFAULT false, "available" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_83937bf600f1bf514081360b9db" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."query_mh_risk_depression_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "query_mh_risk" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "depression" "public"."query_mh_risk_depression_enum" NOT NULL, "self_aggression" boolean NOT NULL, "insomnia" boolean NOT NULL, "drugs" boolean NOT NULL, "mourning" boolean NOT NULL, "family_support" boolean NOT NULL, "evaluation_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2778f2a9eeb72d7250e0f4da610" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "result_mh_risk" ("risk" character varying NOT NULL, "procedure" character varying NOT NULL, CONSTRAINT "PK_f839a51c566c8254865b842f492" PRIMARY KEY ("risk"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "result_mh_risk"`);
    await queryRunner.query(`DROP TABLE "query_mh_risk"`);
    await queryRunner.query(
      `DROP TYPE "public"."query_mh_risk_depression_enum"`,
    );
    await queryRunner.query(`DROP TABLE "on_duty"`);
    await queryRunner.query(`DROP TABLE "employees"`);
    await queryRunner.query(`DROP TYPE "public"."employees_specialty_enum"`);
    await queryRunner.query(`DROP TYPE "public"."employees_job_enum"`);
    await queryRunner.query(`DROP TABLE "data"`);
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP TABLE "appointments"`);
  }
}
