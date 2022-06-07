import { MigrationInterface, QueryRunner } from "typeorm";

export class createQueryMhRiskTable1654609941218 implements MigrationInterface {
    name = 'createQueryMhRiskTable1654609941218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."query_mh_risk_depression_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "query_mh_risk" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "depression" "public"."query_mh_risk_depression_enum" NOT NULL, "self_aggression" boolean NOT NULL, "insomnia" boolean NOT NULL, "drugs" boolean NOT NULL, "mourning" boolean NOT NULL, "family_support" boolean NOT NULL, "evaluation_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2778f2a9eeb72d7250e0f4da610" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query_mh_risk"`);
        await queryRunner.query(`DROP TYPE "public"."query_mh_risk_depression_enum"`);
    }

}
