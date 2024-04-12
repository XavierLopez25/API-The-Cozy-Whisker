import conn from './conn.js';

//Get all tables
export async function getAllTables() {
  const result = await conn.query(`SELECT * FROM Empleado;`);
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

export async function getFoodPlates() {
  const result = await conn.query(`SELECT * FROM PlatoBebida;`);
  return result.rows;
}

export async function fetchAllOrders(tipo_comida) {
  const result = await conn.query(`SELECT * FROM fetch_detalle_by_tipo($1::TEXT);`, [tipo_comida]);
  return result.rows;
}

export async function createOrder(
  mesa_id_arg,
  platoB_id_arg,
  cantidad_arg,
  medidaC_id_arg,
  nota_arg,
) {
  await conn.query(
    `CALL create_pedido_and_detalle_with_mesa_id($1::INT, $2::INT, $3::INT, $4::INT, $5::TEXT);`,
    [mesa_id_arg, platoB_id_arg, cantidad_arg, medidaC_id_arg, nota_arg],
  );
}

export async function fetchOrderCheckout(mesa_id_arg) {
  const result = await conn.query(
    `SELECT * FROM calculate_order_details_for_latest_order($1::INT);`,
    [mesa_id_arg],
  );
  return result.rows;
}

export async function fetchTotalFinalOrder(mesa_id_arg) {
  const result = await conn.query(
    `SELECT SUM(subtotal) * 1.10 AS total_final FROM calculate_order_details_for_latest_order($1::INT);`,
    [mesa_id_arg],
  );
  return result.rows;
}

export async function fetchIndividualPayments(mesa_id_arg) {
  const result = await conn.query(
    `SELECT monto FROM Pago WHERE Pago.factura_id = (SELECT factura_id FROM Factura WHERE cuenta_id = (SELECT num_cuenta FROM Cuenta WHERE mesa_id = $1 AND estado = 'Cerrada' ORDER BY fecha_fin DESC LIMIT 1) ORDER BY fecha_emision DESC LIMIT 1)`,
    [mesa_id_arg],
  );
  return result.rows;
}

//SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'
