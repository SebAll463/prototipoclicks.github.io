// server.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.json());

const users = []; // Array de usuarios, se recomienda utilizar una base de datos.

app.post('/register', (req, res) => {
  const user = { username: req.body.username, password: req.body.password };
  users.push(user);
  res.status(201).send();
});

app.post('/login', (req, res) => {
  const user = users.find(u => u.username === req.body.username && u.password === req.body.password);
  if (user) {
    const token = jwt.sign({ username: user.username }, 'secret_key');
    res.json({ token });
  } else {
    res.status(401).send('Username or password incorrect');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
