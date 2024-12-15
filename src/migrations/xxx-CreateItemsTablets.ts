import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class xxxCreateItemsTable implements MigrationInterface {
  name = 'xxxCreateItemsTable';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items',

        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true },
          { name: 'title', type: 'varchar', length: '255' },
          {
            name: 'createdAt',
            type: 'datetime',
            precision: 6,
            default: 'NOW()',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            precision: 6,
            isNullable: true,
          },
          {
            name: 'deletedAt',
            type: 'datetime',
            precision: 6,
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('items');
  }
}
