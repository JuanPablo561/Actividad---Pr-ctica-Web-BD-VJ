const { query } = require('../database/connection');

const home = (req, res) => {
  res.json({ message: 'Bienvenido a la REST-API' });
};

const marco = (req, res) => {
  res.json({ message: 'polo' });
};

const ping = async (req, res) => {
  try {
    const result = await query('SELECT SYSDATETIME() AS now');
    res.json({ message: 'pong', db: 'connected', now: result.recordset[0].now });
  } catch (error) {
    res.status(500).json({ message: 'pong', db: 'error', error: error.message });
  }
};

module.exports = { home, marco, ping };
