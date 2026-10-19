const { query } = require('../database/connection');
const { verifyPassword } = require('../utils/password');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'email y password son obligatorios' });
  }

  try {
    const result = await query(
      `SELECT id, name, email, password, points, created_at
       FROM users WHERE email = @email`,
      { email },
    );

    const user = result.recordset[0];
    if (!user || !verifyPassword(password, user.password)) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    res.json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        points: user.points,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login };
