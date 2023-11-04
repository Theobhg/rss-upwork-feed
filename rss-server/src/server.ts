import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify();
fastify.register(cors, {
  origin: true,
});

fastify.get('/', (req, reply) => {
  reply.send([{ hello: 'world' }]);
});

fastify
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server running...'));
