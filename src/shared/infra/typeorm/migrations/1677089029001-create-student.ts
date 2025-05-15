import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStudents1677089029001 implements MigrationInterface {
  up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.createTable(
      new Table({
        name: 'students',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'nome', type: 'varchar', isNullable: false },
          { name: 'email', type: 'varchar', isNullable: false },
          { name: 'data_nascimento', type: 'varchar', isNullable: false },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
        indices: [
          {
            columnNames: ['nome'],
          },
          {
            columnNames: ['email'],
          },
        ],
        uniques: [{ columnNames: ['email'] }],
      })
    );
  };

  down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.dropTable('students');
  };
}
