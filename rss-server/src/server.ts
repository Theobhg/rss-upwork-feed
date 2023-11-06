import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';

import articles from './rss-parser';

const fastify: FastifyInstance = Fastify();
fastify.register(cors, {
  origin: true,
});

fastify.get('/', async (request, reply) => {
  return reply.status(200).send(articles);
});

const startServer = async () => {
  try {
    await fastify.listen({ port: 3333 }).then(() => console.log('Server running...'));
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
