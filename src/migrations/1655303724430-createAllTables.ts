import { MigrationInterface, QueryRunner } from "typeorm";

export class createAllTables1655303724430 implements MigrationInterface {
    name = 'createAllTables1655303724430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cpf" character varying NOT NULL, "birthday" character varying NOT NULL, "gender" character varying NOT NULL, "email" character varying NOT NULL, "mobile" character varying NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "complement" character varying NOT NULL, "zip" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "UQ_87465aba2ccd4e4a3c6a5918fbc" UNIQUE ("cpf"), CONSTRAINT "UQ_869f60dec8abe7e46edaf786f6f" UNIQUE ("email"), CONSTRAINT "PK_2533602bd9247937e3a4861e173" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "password" character varying NOT NULL, "register" character varying NOT NULL, "job" character varying NOT NULL, "specialty" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "data_id" uuid NOT NULL, CONSTRAINT "UQ_bd22bc51ebf37bc1d86435342fd" UNIQUE ("register"), CONSTRAINT "REL_9d6a984962f1ed664423451e56" UNIQUE ("data_id"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "on_duty" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "on_duty" boolean NOT NULL DEFAULT false, "available" boolean NOT NULL DEFAULT false, "employee_id" uuid, CONSTRAINT "REL_e776196af7b554e794aed42349" UNIQUE ("employee_id"), CONSTRAINT "PK_83937bf600f1bf514081360b9db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "subscription" character varying NOT NULL, "data_id" uuid NOT NULL, CONSTRAINT "UQ_a4bdbaad9823ea0672a4df15432" UNIQUE ("subscription"), CONSTRAINT "REL_0905bbabdf4fb87584a45d2b82" UNIQUE ("data_id"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "result_mh_risk" ("risk" character varying NOT NULL, "procedure" character varying NOT NULL, CONSTRAINT "PK_f839a51c566c8254865b842f492" PRIMARY KEY ("risk"))`);
        await queryRunner.query(`CREATE TABLE "query_mh_risk" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "depression" character varying NOT NULL, "self_aggression" boolean NOT NULL, "insomnia" boolean NOT NULL, "drugs" boolean NOT NULL, "mourning" boolean NOT NULL, "family_support" boolean NOT NULL, "evaluation_date" TIMESTAMP NOT NULL DEFAULT now(), "client_id" uuid, "result_mh_risk_id" character varying, CONSTRAINT "PK_2778f2a9eeb72d7250e0f4da610" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "anamnesis" character varying, "action" character varying, "on_duty_id" uuid, "query_mh_risk_id" uuid NOT NULL, CONSTRAINT "REL_a6e509779614c9ffb1cb7ad7c2" UNIQUE ("query_mh_risk_id"), CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_9d6a984962f1ed664423451e565" FOREIGN KEY ("data_id") REFERENCES "data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "on_duty" ADD CONSTRAINT "FK_e776196af7b554e794aed423495" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_0905bbabdf4fb87584a45d2b821" FOREIGN KEY ("data_id") REFERENCES "data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" ADD CONSTRAINT "FK_3a26f849a0c6229819f1cdef9e8" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" ADD CONSTRAINT "FK_15a70df7c654903f5636bc51134" FOREIGN KEY ("result_mh_risk_id") REFERENCES "result_mh_risk"("risk") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_8116581e90af53235660de94bf3" FOREIGN KEY ("on_duty_id") REFERENCES "on_duty"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_a6e509779614c9ffb1cb7ad7c23" FOREIGN KEY ("query_mh_risk_id") REFERENCES "query_mh_risk"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_a6e509779614c9ffb1cb7ad7c23"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_8116581e90af53235660de94bf3"`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" DROP CONSTRAINT "FK_15a70df7c654903f5636bc51134"`);
        await queryRunner.query(`ALTER TABLE "query_mh_risk" DROP CONSTRAINT "FK_3a26f849a0c6229819f1cdef9e8"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_0905bbabdf4fb87584a45d2b821"`);
        await queryRunner.query(`ALTER TABLE "on_duty" DROP CONSTRAINT "FK_e776196af7b554e794aed423495"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_9d6a984962f1ed664423451e565"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TABLE "query_mh_risk"`);
        await queryRunner.query(`DROP TABLE "result_mh_risk"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "on_duty"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TABLE "data"`);
    }

}
