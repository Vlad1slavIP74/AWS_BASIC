import { Connection, ConnectionManager,
     createConnection, getConnectionManager } from 'typeorm';

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

/**
 * Database manager class
 */
export class Database {
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = 'default';

    let connection: Connection;

    if (this.connectionManager.has(CONNECTION_NAME)) {
            // console.info(`Database.getConnection()-using existing connection ...`)
      connection = await this.connectionManager.get(CONNECTION_NAME);

      if (!connection.isConnected) {
        connection = await connection.connect();
      }
    }
    else {
            // console.info(`Database.getConnection()-creating connection ...`)
      connection = await createConnection({
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
      }); }

    return connection;
  }
}
