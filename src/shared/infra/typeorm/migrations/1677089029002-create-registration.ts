import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRegistrations1677089029002 implements MigrationInterface {
  up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.createTable(
      new Table({
        name: 'registrations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'curso_id', type: 'uuid', isNullable: false },
          { name: 'aluno_id', type: 'uuid', isNullable: false },
          { name: 'data_matricula', type: 'timestamp', default: 'now()' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
        uniques: [{ columnNames: ['curso_id', 'aluno_id'] }],
      })
    );
  };

  down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.dropTable('registrations');
  };
}
