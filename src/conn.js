import pkg from 'pg';
const { Pool } = pkg;

// Creating a new pool using pg
const pool = new Pool({
  host: 'localhost',
  user: 'dbadmin',
  database: 'the_cozy_whisker',
  password: '1234',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});

export default pool;
