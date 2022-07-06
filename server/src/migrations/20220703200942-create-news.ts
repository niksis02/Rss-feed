'use strict';

import { UUIDV4 } from 'sequelize';

module.exports = {
  async up(queryInterface: any, DataType: any) {
    await queryInterface.createTable('News', {
      id: {
        type: DataType.UUID,
        defaulValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataType.STRING,
        allowNull: false,
      },
      description: {
        type: DataType.STRING,
        allowNull: false,
      },
      link: {
        type: DataType.STRING,
        allowNull: false,
      },
      pubDate: {
        type: DataType.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataType.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataType.DATE,
      },
    });
  },
  async down(queryInterface: any, DataType: any) {
    await queryInterface.dropTable('News');
  },
};
