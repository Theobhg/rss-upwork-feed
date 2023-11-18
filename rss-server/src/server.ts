import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { articles, parse } from './rss-parser';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const port = process.env.PORT;

app.use(cors({ origin: '*' }));

app.get('/', (req: Request, res: Response) => {
   res.send(articles);
});

setInterval(async () => {
   await parse(process.env.UPWORK_RSS_URL as string);

   io.emit('feed-update', articles);
}, 10000);

httpServer.listen(port, () => console.log(`Server running on port ${port}`));
