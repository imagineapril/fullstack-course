import { Pool, QueryResult, QueryResultRow } from 'pg';
import { DBError } from '../errors';

export const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'food-server',
  password: '123456',
  port: 17000,
});

export const dbQuery = async <T extends QueryResultRow>(
  sqlRaw: string,
  params: (string | number)[] = [],
// ): Promise<{rows: T[], count: number}> => {
): Promise<{ rows: T[], count: number}> => {
  try {
    const dbResponse = await pool.query(sqlRaw, params as unknown[]);
    // return { rows: dbResponse.rows, count: dbResponse.rowCount ?? 0 };
    return { rows: dbResponse.rows, count: dbResponse.rowCount ?? 0}
  } catch(error) {
    console.error(error);
    throw new DBError();
  }
};

// interface IUser {
//   id: number;
//   name: string;
// }
