import { MigrationInterface, QueryRunner } from "typeorm";

export class populateResultMhRiskTable1656405753329
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          INSERT INTO "result_mh_risk"
              ("risk", "procedure")
          VALUES
              ('grave', 'Direcionamento prioritário, atendimento clínico imediato.'),
              ('elevado', 'Classificação imediata, atendimento clínico sem risco imediato de vida.'),
              ('moderado', 'Tratamento no CAPS ou ambulatório especializado em saúde mental.'),
              ('baixo', 'Atendimento na rede de atenção primária à saúde'),
              ('inespecífico', 'Sem necessidade de atendimento pela rede de saúde')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DELETE FROM "result_mh_risk"
        `);
  }
}
