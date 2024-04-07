
--Use only for subsequent runs
--DROP DATABASE the_cozy_whisker;

CREATE DATABASE the_cozy_whisker;

GRANT ALL PRIVILEGES ON DATABASE the_cozy_whisker TO dbadmin;

-- Table creation for 'Área'
CREATE TABLE Area (
    area_id SERIAL PRIMARY KEY,
    nombre TEXT,
    fumadores BOOL,
    mesaMovil BOOL
);

-- Table creation for 'Mesa'
CREATE TABLE Mesa (
    mesa_id SERIAL PRIMARY KEY,
    capacidadMesa INT,
    esMovil BOOL,
    area_id INT REFERENCES Area(area_id)
);

-- Table creation for 'Cuenta'
CREATE TABLE Cuenta (
    num_cuenta TEXT PRIMARY KEY,
	mesa_id INT REFERENCES Mesa(mesa_id),
    estado TEXT,
    fecha_inicio TIMESTAMP,
    fecha_fin TIMESTAMP,
    personas INT
);

-- Table creation for 'Empleado'
CREATE TABLE Empleado (
    empleado_id SERIAL PRIMARY KEY,
    nombre TEXT,
    rol TEXT,
    fechaEntrada TIMESTAMP
);

-- Table creation for 'Factura'
CREATE TABLE Factura (
    factura_id SERIAL PRIMARY KEY,
    cuenta_id TEXT REFERENCES Cuenta(num_cuenta),
    nit TEXT,
    direccion TEXT,
    nombre TEXT,
    fecha_emision TIMESTAMP
);

-- Table creation for 'Pago'
CREATE TABLE Pago (
    pago_id SERIAL PRIMARY KEY,
    factura_id INT REFERENCES Factura(factura_id),
    monto_efectivo DECIMAL,
    tarjeta BOOL,
	efectivo BOOL,
    monto_tarjeta DECIMAL
);

-- Table creation for 'PlatoBebida'
CREATE TABLE PlatoBebida (
    platoBebida_id SERIAL PRIMARY KEY,
    tipo TEXT,
    nombre TEXT,
    descripcion TEXT,
    precio DECIMAL,
    imagenLink TEXT
);

-- Table creation for 'Queja'
CREATE TABLE Queja (
    queja_id SERIAL PRIMARY KEY,
    nit TEXT,
    empleado_id INT REFERENCES Empleado(empleado_id),
    motivo TEXT,
    platoBebida_id INT REFERENCES PlatoBebida(platoBebida_id),
    clasificacion INT,
    fecha TIMESTAMP
);

-- Table creation for 'EncuestasSatisfaccion'
CREATE TABLE EncuestasSatisfaccion (
    encuesta_id SERIAL PRIMARY KEY,
    nit TEXT,
    empleado_id INT REFERENCES Empleado(empleado_id),
    amabilidad INT,
    exactitud INT,
    fecha TIMESTAMP,
    queja_id INT REFERENCES Queja(queja_id)
);

-- Table creation for 'Usuario'
CREATE TABLE Usuario (
    empleado_id INT REFERENCES Empleado(empleado_id),
    usuario TEXT,
    pwd_md5 TEXT
);

-- Table creation for 'Medida'
CREATE TABLE Medida (
    medida_id SERIAL PRIMARY KEY,
    tipo TEXT,
    descripcion TEXT
);

-- Table creation for 'MedidaComida'
CREATE TABLE MedidaComida (
    medC_id SERIAL PRIMARY KEY,
    platoBebida_id INT REFERENCES PlatoBebida(platoBebida_id),
    medida_id INT REFERENCES Medida(medida_id)
);

-- Table creation for 'Pedido'
CREATE TABLE Pedido (
    pedido_id SERIAL PRIMARY KEY,
    num_cuenta TEXT REFERENCES Cuenta(num_cuenta)
);

-- Table creation for 'DetallePedido'
CREATE TABLE DetallePedido (
    detalle_id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES Pedido(pedido_id),
    platoB_id INT REFERENCES PlatoBebida(platoBebida_id),
    cantidad INT,
    medidaC_id INT REFERENCES MedidaComida(medC_id),
    fecha_ordenado TIMESTAMP,
    Nota TEXT
);
