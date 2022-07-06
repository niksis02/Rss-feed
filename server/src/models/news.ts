'use strict';
import { Model, UUIDV4 } from 'sequelize';

interface NewsAttributes {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class News extends Model<NewsAttributes> implements NewsAttributes {
    id!: string;
    title!: string;
    description!: string;
    link!: string;
    pubDate!: Date;
    static associate(models: any) {
      // define association here
    }
  }
  News.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pubDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'News',
    },
  );
  return News;
};
