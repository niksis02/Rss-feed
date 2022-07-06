import db from '../models';

export class NewsService {
  db: any;
  constructor() {
    this.db = db;
  }

  async findNewsByKeywords(keywords: string[]) {
    const queryKeywords = keywords.map((elem) => `'%${elem}%'`);
    const query = `select * from "News" where "description" like any(array[${queryKeywords.join(
      ', ',
    )}]) or "title" like any(array[${queryKeywords.join(', ')}])`;
    const news = await db.sequelize.query(query);
    return news[0];
  }
  async getLatestNews() {
    const query = 'SELECT * FROM "News" ORDER BY "pubDate" DESC FETCH FIRST ROW ONLY';
    return await db.sequelize.query(query);
  }
}
