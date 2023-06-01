import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableUserProfile1685574149947 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_profile',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'id_user',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'id_profile',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'active',
            type: 'boolean',
            default: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['D', 'A'],
            default: '"A"',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            default: 'now()',
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

    await queryRunner.createForeignKey('user_profile', new TableForeignKey({
      columnNames: ['id_user'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE'
    }));

    await queryRunner.createForeignKey('user_profile', new TableForeignKey({
      columnNames: ['id_profile'],
      referencedColumnNames: ['id'],
      referencedTableName: 'profile',
      onDelete: 'CASCADE'
    }));

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_profile');
  }
}
