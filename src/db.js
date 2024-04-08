import conn from './conn.js';

//Get all tables
export async function getAllTables() {
  const result = await conn.query(`SELECT * FROM Usuario;`);
  return result.rows;
}

export async function loginUser(username, password) {
  const result = await conn.query(`SELECT usuario, pwd_md5 FROM user_login($1::TEXT, $2::TEXT)`, [
    username,
    password,
  ]);
  return result;
}

export async function registerNewEmployee({ name, role, startDate, username, password }) {
  const result = await conn.query(
    `SELECT * FROM register_new_employee($1::TEXT, $2::TEXT, $3::DATE, $4::TEXT, $5::TEXT)`,
    [name, role, startDate, username, password],
  );
  return result;
}

//SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'
