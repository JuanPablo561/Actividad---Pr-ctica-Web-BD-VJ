const { query } = require('../database/connection');

// GET /game/:user_id  ->  { name, points }
const getGameUser = async (req, res) => {
  const id = parseInt(req.params.user_id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'user_id inválido' });
  }

  try {
    const result = await query(
      'SELECT name, points FROM users WHERE id = @id',
      { id },
    );
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /game/:user_id  body: { points }  ->  { name, points }
const updateGamePoints = async (req, res) => {
  const id = parseInt(req.params.user_id, 10);
  const { points } = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'user_id inválido' });
  }
  if (!Number.isInteger(points) || points < 0) {
    return res.status(400).json({ message: 'points debe ser un entero mayor o igual a 0' });
  }

  try {
    const result = await query(
      `UPDATE users SET points = @points
       OUTPUT INSERTED.name, INSERTED.points
       WHERE id = @id`,
      { points, id },
    );
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getGameUser, updateGamePoints };
