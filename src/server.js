const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const host = '0.0.0.0';
    const port = parseInt(process.env.PORT) || 8080;
    
    // const host = 'localhost';
    // const port = 8000
    
    const server = Hapi.server({
        port: port,
        host: host,
    });

    server.route(routes);

    await server.start();
    console.log(`Listening on ${server.info.uri}`);
};

init ();