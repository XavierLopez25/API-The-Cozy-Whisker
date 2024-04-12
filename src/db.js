import conn from './conn.js';

//Get all tables
export async function getAllTables() {
  const result = await conn.query(`SELECT * FROM PlatoBebida;`);
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

export async function getRoleName(username, password) {
  const result = await conn.query(
    `SELECT e.nombre, e.rol FROM Empleado e INNER JOIN Usuario u ON e.empleado_id = u.empleado_id WHERE u.usuario = $1 AND u.pwd_md5 = MD5($2);`,
    [username, password],
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

export async function getFoodByType(type) {
  const result = await conn.query(`SELECT * FROM PlatoBebida WHERE tipo = $1;`, [type]);
  return result.rows;
}

//SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'
