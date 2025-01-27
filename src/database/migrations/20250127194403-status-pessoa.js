'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Pessoas', 'status', {
      type: Sequelize.ENUM('Ativo', 'Inativo'),
      allowNull: false,
    })

    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Pessoas', 'status')
  }
};
