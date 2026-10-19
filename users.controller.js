const { query } = require('../database/connection');
const { hashPassword } = require('../utils/password');

// 2627 = violación de UNIQUE constraint, 2601 = índice único duplicado
const isDuplicateEmail = (error) => error.number === 2627 || error.number === 2601;

const parseId = (value) => {
  const id = parseInt(value, 10);
  return Number.isNaN(id) ? null : id;
};

const getUsers = async (req, res) => {
  try {
    const result = await query(
      'SELECT id, name, email, points, created_at FROM users ORDER BY id',
    );
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ message: 'id inválido' });

  try {
    const result = await query(
      'SELECT id, name, email, points, created_at FROM users WHERE id = @id',
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

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'name, email y password son obligatorios' });
  }

  try {
    const result = await query(
      `INSERT INTO users (name, email, password)
       OUTPUT INSERTED.id, INSERTED.name, INSERTED.email, INSERTED.points, INSERTED.created_at
       VALUES (@name, @email, @password)`,
      { name, email, password: hashPassword(password) },
    );
    res.status(201).json(result.recordset[0]);
  } catch (error) {
    if (isDuplicateEmail(error)) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ message: 'id inválido' });

  const { name, email, password } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'name y email son obligatorios' });
  }

  try {
    const result = await query(
      `UPDATE users
       SET name = @name, email = @email, password = COALESCE(@password, password)
       OUTPUT INSERTED.id, INSERTED.name, INSERTED.email, INSERTED.points, INSERTED.created_at
       WHERE id = @id`,
      { name, email, password: password ? hashPassword(password) : null, id },
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    if (isDuplicateEmail(error)) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ message: 'id inválido' });

  try {
    const result = await query(
      'DELETE FROM users OUTPUT DELETED.id WHERE id = @id',
      { id },
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado', id: result.recordset[0].id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
