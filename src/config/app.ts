import * as dotenv from 'dotenv';
dotenv.config();

export const server = {
  port: process.env.SERVER_PORT,
};

export const dataBase = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  schema: process.env.DB_SCHEMA,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};
