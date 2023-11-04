import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import cors from '@fastify/cors';
import { parse } from './rss-parser';
import { articles } from './articleData';

const fastify: FastifyInstance = Fastify({});
fastify.register(cors, {
  origin: true,
});

// const opts: RouteShorthandOptions = {
//   schema: {
//     response: {
//       200: {
//         type: 'object',
//         properties: {
//           articles: [''],
//         },
//       },
//     },
//   },
// };

parse;

fastify.get('/', async (request, reply) => {
  return reply.send(articles);
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
