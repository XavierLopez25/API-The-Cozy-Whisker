import conn from './conn.js';

//Get all tables
export async function getAllTables() {
  const result = await conn.query(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`,
  );
  return result.rows;
}
