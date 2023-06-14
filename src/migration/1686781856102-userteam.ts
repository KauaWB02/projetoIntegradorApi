import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Userteam1686781856102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'user_team',
            columns: [
              {
                name: 'id',
                type: 'varchar',
                isPrimary: true,
                isUnique: true,
                isNullable: false,
              },

              {
                name: 'id_team',
                type: 'varchar',
                isNullable: false,
              },

              {
                name: 'id_user',
                type: 'varchar',
                isNullable: false,
              },

              {
                name: 'accept',
                type: 'int',
                isNullable: false,
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
        await queryRunner.dropTable('user_team');
      }

}
