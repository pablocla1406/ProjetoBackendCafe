'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Pessoas', 'imagem', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Pessoas', 'imagem', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
