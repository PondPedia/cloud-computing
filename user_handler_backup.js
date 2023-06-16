const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: '$2a$12$DjkaxUOakqHoffg1749T3u9kHhwSAdiJSe0dMQyYovJucwezyOtgu',
    //   password: 'password'
    //   password: '$2b$10$W7n4NdXzWvG2M2xLerU4zOIEuX7B5RqkIcLg6vRvYBjQsXQ5Y8r9i' // Hashed password: password
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: '$2a$12$WUn9M/QXpbNXlJXFhf.TneFEOoFmfWfV2Y7YtkcjVHJYC3i487zti'
    //   password: '$2b$10$W7n4NdXzWvG2M2xLerU4zOIEuX7B5RqkIcLg6vRvYBjQsXQ5Y8r9i' // Hashed password: password
    }
];

const registerHandler = async (request, h) => {
    const { name, email, password } = request.payload;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const id = users.length + 1;
    const newUser = { id, name, email, password: hashedPassword };
    users.push(newUser);

    const token = jwt.sign({ id }, 'secret', { expiresIn: '1h' });

    return { token };
}

const loginHandler = async  (request, h) => {
    const { email, password } = request.payload;
    const user = users.find(u => u.email === email);

    if (!user) {
      return h.response({ message: 'Invalid credentials (Username)' }).code(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return h.response({ message: 'Invalid credentials (Password)' }).code(401);
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });

    return { token };
}

module.exports = {registerHandler, loginHandler};