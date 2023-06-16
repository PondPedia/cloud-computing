const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});


const init = async () => {
    // const host = 'localhost';
    // const port = 8000;

    server.route(routes);

    await server.start();
    console.log(`Listening on ${server.info.uri}`);
};

async function start() {
  // Register JWT authentication strategy
  await server.register(require('hapi-auth-jwt2'));
  server.auth.strategy('jwt', 'jwt', {
    key: 'secret',
    validate: async (decoded, request, h) => {
      // Check if the user exists in the database
      const user = users.find(u => u.id === decoded.id);
      if (!user) {
        return { isValid: false };
      }
      return { isValid: true };
    },
    verifyOptions: { algorithms: ['HS256'] }
  });

  await init();
}

start();