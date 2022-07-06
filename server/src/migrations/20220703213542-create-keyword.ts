('use strict');

import { UUIDV4 } from 'sequelize';

module.exports = {
  async up(queryInterface: any, DataTypes: any) {
    await queryInterface.createTable('Keywords', {
      keyword_id: {
        type: DataTypes.UUID,
        defaulValue: UUIDV4,
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.dropTable('Keywords');
  },
};
