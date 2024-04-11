import conn from './conn.js';

//Get all tables
export async function getAllTables() {
  const result = await conn.query(`SELECT * FROM Cuenta;`);
  return result.rows;
}

export async function loginUser(username, password) {
  const result = await conn.query(`SELECT usuario, pwd_md5 FROM user_login($1::TEXT, $2::TEXT);`, [
    username,
    password,
  ]);
  return result;
}

export async function registerNewEmployee(name, role, startDate, username, password) {
  const result = await conn.query(
    `SELECT * FROM register_new_employee($1::TEXT, $2::TEXT, $3::DATE, $4::TEXT, $5::TEXT);`,
    [name, role, startDate, username, password],
  );
  return result;
}

export async function insertNewCuenta(mesaId, personas) {
  await conn.query(`CALL insert_new_cuenta($1::INT, $2::INT);`, [mesaId, personas]);
}

export async function closeCuenta(mesaId, nit, dir, nombre, efectivo, tarjeta) {
  await conn.query(
    `CALL close_cuenta($1::INT, $2::TEXT, $3::TEXT, $4::TEXT, $5::BOOLEAN, $6::BOOLEAN);`,
    [mesaId, nit, dir, nombre, efectivo, tarjeta],
  );
}

//SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'
