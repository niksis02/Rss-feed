import { NewsService } from './../services/news-service';
import cron from 'node-cron';
import axios from 'axios';
import db from '../models/index';
import { parseString } from 'xml2js';

const newsDBUpdate = async () => {
  const newsService = new NewsService();
  const data = await newsService.getLatestNews();
  let lastBuildDate = data[0][0]?.pubDate && new Date(data[0][0]?.pubDate);

  cron.schedule('0 * * * * *', async () => {
    const { data } = await axios.get('http://feeds.bbci.co.uk/news/rss.xml');
    parseString(data, async (err: any, result: any) => {
      if (err) console.log(err);
      if (!lastBuildDate) {
        await db.News.bulkCreate(
          result.rss.channel[0].item.map((elem: any) => ({
            title: elem['title'][0],
            description: elem['description'][0],
            link: elem['link'][0],
            pubDate: new Date(elem['pubDate'][0]),
          })),
        );
        lastBuildDate = new Date(result.rss.channel[0].lastBuildDate[0]);
        return;
      } else {
        await db.News.bulkCreate(
          result.rss.channel[0].item
            .filter((elem: any) => {
              const creationDate = new Date(elem.pubDate);
              return creationDate.getTime() > lastBuildDate.getTime();
            })
            .map((elem: any) => ({
              title: elem['title'][0],
              description: elem['description'][0],
              link: elem['link'][0],
              pubDate: new Date(elem['pubDate'][0]),
            })),
        );
        lastBuildDate = new Date(result.rss.channel[0].lastBuildDate[0]);
      }
    });
  });
};

export default [newsDBUpdate];
