import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { articles, parse } from './rss-parser';
import { buildRssUrlFilterQueries } from './utils/rssUrlQueryBuilder';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const port = process.env.PORT;

let rssUrlFilterQueries = '';

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
   res.send(articles);
});

app.post('/rss-filter', async (req: Request, res: Response) => {
   // Access all formData's properties values to build the RSS URL query string
   rssUrlFilterQueries = buildRssUrlFilterQueries(req.body);

   await parse(
      `${process.env.UPWORK_RSS_URL}?${rssUrlFilterQueries}
      ${process.env.UPWORK_RSS_URL_API_PARAMS}
      ${process.env.UPWORK_RSS_URL_API_TOKEN}
      ${process.env.UPWORK_RSS_URL_API_USER_UID}
      ${process.env.UPWORK_RSS_URL_API_ORG_UID}` as string
   );
   console.log(rssUrlFilterQueries);
   io.emit('feed-update', articles);
});

setInterval(async () => {
   await parse(
      `${process.env.UPWORK_RSS_URL}?${rssUrlFilterQueries}
      ${process.env.UPWORK_RSS_URL_API_PARAMS}
      ${process.env.UPWORK_RSS_URL_API_TOKEN}
      ${process.env.UPWORK_RSS_URL_API_USER_UID}
      ${process.env.UPWORK_RSS_URL_API_ORG_UID}` as string
   );

   io.emit('feed-update', articles);
}, 10000);

httpServer.listen(port, () => console.log(`Server running on port ${port}`));
