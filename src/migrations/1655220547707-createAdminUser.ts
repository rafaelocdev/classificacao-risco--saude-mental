import { MigrationInterface, QueryRunner } from "typeorm";
import { hashSync } from "bcrypt";
import { config } from "dotenv";

config();

export class createAdminUser1655220547707 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO "data"
            ("cpf", "birthday", "gender", "email", "mobile", "street", "number", "complement", "zip", "city", "state")
        VALUES
            ('${99999999999}','00/00/000','A','admin@admin.com','${123456789}','admin','${0}','admin','${9999999}','Admin','AD')
    `);

    const admin = await queryRunner.query(`
        SELECT dt.id
        FROM data AS dt
        WHERE dt.cpf = '99999999999'
    `);

    await queryRunner.query(`
        INSERT INTO "employees"
            ("name", "password", "register", "job", "specialty", "data_id")
        VALUES
            ('Admin', '${hashSync(
              process.env.ADMIN_PWD,
              10,
            )}', '1234', 'Administrador(a)', 'Admin', '${admin[0].id}')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM "employees"
    DELETE FROM "data"
`);
  }
}
