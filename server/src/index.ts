import express, { Express } from 'express';
import dotenv from 'dotenv';
import schedulers from './schedulers/feed';
import appRouter from './routes/appRouter';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { KeywordService } from './services/keyword-service';
import { NewsService } from './services/news-service';

dotenv.config();

const app: Express = express();
const server = http.createServer(app);

const { PORT } = process.env;
const port = PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/', appRouter);

schedulers.forEach((elem: () => void) => {
  elem();
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  const keywordService = new KeywordService();
  const newsService = new NewsService();

  socket.on('getFeed', async (user_id: string) => {
    try {
      if (!user_id) return;

      const keywords = await keywordService.findUserKeywords(user_id);

      if (keywords.length === 0) return;
      const feed = await newsService.findNewsByKeywords(keywords.map((elem) => elem.keyword));
      console.log('------', feed);
      io.to(socket.id).emit('keywords', keywords);
      io.to(socket.id).emit('feed', feed);
    } catch (err: any) {
      io.to(socket.id).emit('error', err.message);
      return;
    }
  });

  socket.on('addKeyword', async (data: { user_id: string; keyword: string }) => {
    let keyword;

    try {
      keyword = await keywordService.add(data.user_id, data.keyword);
    } catch (err) {
      io.to(socket.id).emit('error', 'Keyword has already been added');
      return;
    }

    try {
      const news = await newsService.findNewsByKeywords([data.keyword]);

      io.to(socket.id).emit('getFeed_addKeyword', news);
      io.to(socket.id).emit('addKeywordEvent', keyword);
    } catch (err: any) {
      return io.to(socket.id).emit('error', err.message);
    }
  });

  socket.on('removeKeyword', async (data: { keyword: string; keyword_id: string; user_id: string }) => {
    try {
      await keywordService.remove(data.keyword_id);
      const news = await newsService.findNewsByKeywords([data.keyword]);

      io.to(socket.id).emit('getFeed_removeKeyword', news);
      io.to(socket.id).emit('removeKeyword', data.keyword_id);
    } catch (err: any) {
      return io.to(socket.id).emit('error', err.message);
    }
  });

  socket.on('editKeyword', async (data: { keyword: string; keyword_id: string; user_id: string }) => {
    try {
      await keywordService.update(data.keyword_id, data.keyword);
      const keywords = await keywordService.findUserKeywords(data.user_id);

      if (keywords.length === 0) return;

      const feed = await newsService.findNewsByKeywords(keywords.map((elem) => elem.keyword));
      io.to(socket.id).emit('keywords', keywords);
      io.to(socket.id).emit('feed', feed);
    } catch (err: any) {
      return io.to(socket.id).emit('error', err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

server.listen(port, () => {
  console.info(`Express server running on port ${port}\nhttp://localhost:${port}`);
});
