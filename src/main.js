import express from 'express';
import pool from './conn.js';

import { getAllTables, loginUser, registerNewEmployee } from './db.js';
import bodyParser from 'body-parser';

// Inicializar la aplicación Express
const app = express();
// Habilitar el middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());
app.use(bodyParser.json());

const port = 5000;

app.get('/', async (req, res) => {
  const posts = await getAllTables();
  console.log(posts);
  res.send('Hello World from API!');
});

// User Registration Endpoint
app.post('/register', async (req, res) => {
  const { name, role, startDate, username, password } = req.body;
  try {
    const result = await registerNewEmployee(name, role, startDate, username, password);
    res.json({
      status: 'success',
      employeeId: result.rows[0].register_new_employee,
    });
  } catch (error) {
    console.error('Error executing register_new_employee function', error.stack);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// User Login Endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('TEST', username);
  console.log('TEST', password);
  try {
    const result = await loginUser(username, password);
    if (result.rows.length > 0) {
      res.json({ status: 'success', user: result.rows[0] });
    } else {
      res.status(401).json({ status: 'fail', message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error executing user_login function', error.stack);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
