import express from 'express';
import bodyParser from 'body-parser';

import { getAllTables } from './db.js';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
const port = 5000;

app.get('/', async (req, res) => {
  const posts = await getAllTables();
  console.log(posts);
  res.send('Hello World from API!');
});

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
