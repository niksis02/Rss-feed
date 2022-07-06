import { Model } from 'sequelize/types';
import db from '../models';

interface IKeyword {
  keyword_id: string;
  keyword: string;
}

interface IKeywords {
  dataValues: IKeyword;
}

export class KeywordService {
  Keyword: Model;
  constructor() {
    this.Keyword = db.Keyword;
  }

  async add(user_id: string, keyword: string) {
    const { dataValues } = await db.Keyword.create({
      keyword,
      user_id,
    });
    return dataValues;
  }

  async remove(keyword_id: string) {
    await db.Keyword.destroy({
      where: {
        keyword_id,
      },
    });
  }

  async update(keyword_id: string, keyword: string) {
    await db.Keyword.update(
      { keyword },
      {
        where: {
          keyword_id,
        },
      },
    );
  }

  async findUserKeywords(user_id: string) {
    const keywords: IKeywords[] = await db.Keyword.findAll({
      where: {
        user_id,
      },
      attributes: {
        exclude: ['user_id', 'createdAt', 'updatedAt'],
      },
    });
    return keywords.map((elem) => elem.dataValues);
  }
}
