import init from './aws/src/init';
import { Database } from './aws/src/DbConnection';
import { Connection } from 'typeorm';

export const initAll = async () => {
  const database = new Database();
  const dbConn: Connection = await database.getConnection();

  await dbConn.runMigrations();
  await dbConn.close();
};

async function name(): Promise<void> {
  const database = new Database();
  const dbConn: Connection = await database.getConnection();

  await dbConn.runMigrations();
  await dbConn.close();
}
name();
