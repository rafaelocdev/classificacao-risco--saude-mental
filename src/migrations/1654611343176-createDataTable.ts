import { MigrationInterface, QueryRunner } from "typeorm";

export class createDataTable1654611343176 implements MigrationInterface {
    name = 'createDataTable1654611343176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cpf" integer NOT NULL, "email" character varying(255) NOT NULL, "mobile" integer NOT NULL, "street" character varying(255) NOT NULL, "number" integer NOT NULL, "complement" character varying(50) NOT NULL, "zip" integer NOT NULL, "city" character varying(255) NOT NULL, "state" character(2) NOT NULL, CONSTRAINT "UQ_87465aba2ccd4e4a3c6a5918fbc" UNIQUE ("cpf"), CONSTRAINT "PK_2533602bd9247937e3a4861e173" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "data"`);
    }

}
