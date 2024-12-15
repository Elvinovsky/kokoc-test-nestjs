import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as dotenv from 'dotenv';
import * as process from 'process';
import * as path from 'path';
dotenv.config();

const migrationDir = path.join(
  __dirname,
  'dist',
  'src',
  'database',
  'migrations',
  '*.js',
);
console.log('Директория миграций: ' + migrationDir);

export const ormconfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
  charset: 'utf8mb4',
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,

  logging: true,
  migrations: [migrationDir],
};
