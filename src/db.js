import conn from './conn.js';

//Get all tables
export async function getAllTables() {
  const result = await conn.query(`SELECT * FROM EncuestasSatisfaccion;`);
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

export async function listEmployees() {
  const result = await conn.query(`SELECT empleado_id, nombre, rol FROM Empleado;`);
  return result.rows;
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

export async function getFoodById(id) {
  const result = await conn.query(`SELECT nombre FROM PlatoBebida WHERE platobebida_id = $1;`, [
    id,
  ]);
  return result.rows;
}

export async function getFoodMeasures() {
  const result = await conn.query(
    `SELECT MC.medC_id AS medidaC_id, PB.nombre AS comida, M.descripcion AS tamaño FROM MedidaComida MC INNER JOIN PlatoBebida PB ON MC.platoBebida_id = PB.platoBebida_id INNER JOIN Medida M ON MC.medida_id = M.medida_id ORDER BY MC.medC_id;`,
  );
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

export async function getAvailableMesas() {
  const result = await conn.query(
    `SELECT mesa_id, esmovil, Area.nombre, capacidadmesa AS nombre_area FROM Mesa INNER JOIN Area ON Mesa.area_id = Area.area_id WHERE NOT EXISTS (SELECT 1 FROM Cuenta WHERE Cuenta.mesa_id = Mesa.mesa_id AND Cuenta.estado = 'Abierta');`,
  );
  return result.rows;
}

export async function getOccupiedMesas() {
  const result = await conn.query(
    `SELECT mesa_id, esmovil, Area.nombre, capacidadmesa AS nombre_area FROM Mesa INNER JOIN Area ON Mesa.area_id = Area.area_id WHERE EXISTS (SELECT 1 FROM Cuenta WHERE Cuenta.mesa_id = Mesa.mesa_id AND Cuenta.estado = 'Abierta');`,
  );
  return result.rows;
}

export async function submitQuejaEncuesta(
  nit_arg,
  empleado_id_arg,
  platoBebida_id_arg,
  motivo_arg,
  clasificacion_arg,
  amabilidad_arg,
  exactitud_arg,
) {
  await conn.query(
    `CALL submit_queja_encuesta($1::TEXT, $2::INT, $3::INT, $4::TEXT, $5::INT, $6::INT, $7::INT);`,
    [
      nit_arg,
      empleado_id_arg,
      platoBebida_id_arg,
      motivo_arg,
      clasificacion_arg,
      amabilidad_arg,
      exactitud_arg,
    ],
  );
}

//SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'
