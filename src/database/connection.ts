import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dataBase } from '../config/app';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: dataBase.host,
  port: dataBase.port,
  username: dataBase.username,
  password: dataBase.password,
  database: dataBase.schema,
  synchronize: false,
  logging: false,
  entities: ['build/entity/*.{ts,js}'],
  migrations: ['build/migration/*.{ts,js}'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Conexão com banco iniciada');
  })
  .catch((err) => {
    console.error('Erro ao tentar iniciar conexão ao banco ', err);
  });
