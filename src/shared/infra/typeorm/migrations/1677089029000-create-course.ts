import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCourses1677089029000 implements MigrationInterface {
  up = async (queryRunner: QueryRunner): Promise<void> => {
    // this ensure we can use default: `uuid_generate_v4()`
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'courses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'nome', type: 'varchar', isNullable: false },
          { name: 'descricao', type: 'varchar', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
        indices: [
          {
            columnNames: ['nome'],
          },
        ],
      })
    );
  };

  down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.dropTable('courses');
  };
}
