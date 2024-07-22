const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..')));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin.html'));
});

app.get('/api/usuarios', (req, res) => {
  const usuariosFilePath = path.join(__dirname, '..', 'datos', 'usuarios.json');

  fs.readFile(usuariosFilePath, (err, data) => {
    if (err) {
      console.error('Error leyendo usuarios.json:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    const usuarios = JSON.parse(data);
    res.json(usuarios);
  });
});

app.get('/api/anuncios', (req, res) => {
  const anuncios = [
    { id: 1, imagen: "https://via.placeholder.com/100", enlace: "https://example.com/ad1" },
    { id: 2, imagen: "https://via.placeholder.com/100", enlace: "https://example.com/ad2" },
    // Agrega aquí más anuncios si es necesario
  ];
  res.json(anuncios);
});

app.post('/api/click', (req, res) => {
  const adId = req.body.adId;
  const clicksFilePath = path.join(__dirname, '..', 'datos', 'clicks.json');

  fs.readFile(clicksFilePath, (err, data) => {
    if (err) {
      console.error('Error leyendo clicks.json:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    let clicks = JSON.parse(data);
    if (!clicks[adId]) {
      clicks[adId] = 0;
    }
    clicks[adId]++;

    fs.writeFile(clicksFilePath, JSON.stringify(clicks, null, 2), err => {
      if (err) {
        console.error('Error escribiendo clicks.json:', err);
        return res.status(500).json({ message: 'Error interno del servidor' });
      }
      res.json({ message: 'Clic registrado con éxito' });
    });
  });
});

app.get('/api/clicks', (req, res) => {
  const clicksFilePath = path.join(__dirname, '..', 'datos', 'clicks.json');

  fs.readFile(clicksFilePath, (err, data) => {
    if (err) {
      console.error('Error leyendo clicks.json:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    const clicks = JSON.parse(data);
    res.json(clicks);
  });
});

app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  const usersFilePath = path.join(__dirname, '..', 'datos', 'usuarios.json');

  fs.readFile(usersFilePath, (err, data) => {
    if (err) {
      console.error('Error leyendo usuarios.json:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    let users = JSON.parse(data);
    const userExists = users.find(user => user.email === email);

    if (userExists) {
      return res.status(400).json({ success: false, message: 'El usuario ya existe' });
    }

    users.push({ username, email, password });
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
      if (err) {
        console.error('Error escribiendo usuarios.json:', err);
        return res.status(500).json({ message: 'Error interno del servidor' });
      }
      res.json({ success: true, message: 'Registro exitoso' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
