import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';

import { User } from './entity/User';

import { User1605533131294 } from './migration/1605533131294-User';
interface DB_CRED  {
  DB_TYPE: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER_NAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

const {
    DB_TYPE,
    DB_HOST,
    DB_PORT,
    DB_USER_NAME,
    DB_PASSWORD,
    DB_NAME,
} = process.env;

const dbCred: DB_CRED = {
  DB_TYPE,
  DB_HOST,
  DB_PORT: <number><any>DB_PORT,
  DB_USER_NAME,
  DB_PASSWORD,
  DB_NAME,
};

export default async function init() : Promise<Connection>  {
  const connection:Connection =  await createConnection({
      type:   'postgres',
      host:   dbCred.DB_HOST || '127.0.0.1',
      port:  dbCred.DB_PORT || 5432,
      username: DB_USER_NAME || 'aws',
      password: DB_PASSWORD || 'aws',
      database: DB_NAME || 'aws',
      synchronize: false,
      logging: false,
      entities: [
          User,
        ],
      uuidExtension: 'pgcrypto',
      migrations: [
          User1605533131294,
        ],
      subscribers: [
          './subscriber/**/*.ts',
        ],
      cli: {
          entitiesDir: './entity',
          migrationsDir: './migration',
          subscribersDir: './subscriber',
        },
    });

  return connection;
}
