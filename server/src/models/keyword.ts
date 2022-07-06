'use strict';
import { UUIDV4, Model } from 'sequelize';

interface KeyWordAttributes {
  keyword_id: string;
  keyword: string;
  user_id: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Keyword extends Model<KeyWordAttributes> implements KeyWordAttributes {
    keyword_id!: string;
    keyword!: string;
    user_id!: string;
    static associate(models: any) {
      Keyword.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }

  Keyword.init(
    {
      keyword_id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      keyword: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Keyword',
    },
  );
  return Keyword;
};
