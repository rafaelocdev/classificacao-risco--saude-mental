import { MigrationInterface, QueryRunner } from "typeorm";
import { adminUserInfo } from "../config/adminUserData.config";
import { v4 as uuid } from "uuid";

const {
  name,
  password,
  register,
  job,
  specialty,
  cpf,
  birthday,
  gender,
  email,
  mobile,
  street,
  number,
  complement,
  zip,
  city,
  state,
} = adminUserInfo;

export class createAdminUser1656405828791 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO "data"
                ("cpf", "birthday", "gender", "email", "mobile", "street", "number", "complement", "zip", "city", "state", confirmation_status, confirmation_code)
            VALUES
                ('${cpf}','${birthday}','${gender}','${email}','${mobile}','${street}','${number}','${complement}','${zip}','${city}','${state}', true, '${uuid()}')
        `);

    const adminData = await queryRunner.query(`
            SELECT dt.id
            FROM data AS dt
            WHERE dt.cpf = '${cpf}'
        `);

    await queryRunner.query(`
            INSERT INTO "employees"
                ("name", "password", "register", "job", "specialty", "data_id")
            VALUES
                ('${name}', '${password}', '${register}', '${job}', '${specialty}', '${adminData[0].id}')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM "employees"
        DELETE FROM "data"
    `);
  }
}
