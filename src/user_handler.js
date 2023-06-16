const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');


// Adjust based on your credentials
const pool = new Pool({
  user: 'archsus',
  host: 'localhost',
  database: 'example_database',
  password: '',
  port: 5432,
});

const registerHandler = async (request, h) => {
  const { name, email, password } = request.payload;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  const query = {
    text: 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id',
    values: [name, email, hashedPassword],
  };
  try {
    const { rows } = await pool.query(query);
    const id = rows[0].id;
    const token = jwt.sign({ id }, 'secret', { expiresIn: '1h' });
    return { token };
  } catch (err) {
    console.error(err);
    return h.response({ message: 'Registration failed' }).code(500);
  }
};

const loginHandler = async (request, h) => {
  const { email, password } = request.payload;
  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  };
  try {
    const { rows } = await pool.query(query);
    if (rows.length === 0) {
      return h.response({ message: 'Invalid credentials (Username)' }).code(401);
    }
    const user = rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return h.response({ message: 'Invalid credentials (Password)' }).code(401);
    }
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
    return { token };
  } catch (err) {
    console.error(err);
    return h.response({ message: 'Login failed' }).code(500);
  }
};

module.exports = { registerHandler, loginHandler };





// pg_ctl -D /var/lib/postgres/data -l logfile start