import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableEvents1685304678435 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'events',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'dth_start',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description_switching',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'amount_teams',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'first_place',
            type: 'varchar',
          },
          {
            name: 'second_place',
            type: 'varchar',
          },
          {
            name: 'third_place',
            type: 'varchar',
          },
          {
            name: 'ended',
            type: 'enum',
            enum: ['N', 'S'],
            default: '"N"',
          },
          {
            name: 'ended_at',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
