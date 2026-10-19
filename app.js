const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { frontendOrigin } = require('./config');
const indexRoutes = require('./routes/index.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');
const gameRoutes = require('./routes/game.routes');

const app = express();

app.use(morgan('dev'));
app.use(cors({ origin: frontendOrigin }));
app.use(express.json());

app.use(indexRoutes);
app.use(usersRoutes);
app.use(authRoutes);
app.use(gameRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

module.exports = app;
