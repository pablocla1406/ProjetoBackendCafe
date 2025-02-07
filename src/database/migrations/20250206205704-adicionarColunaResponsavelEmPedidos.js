'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Pedidos', 'responsavel_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Pessoas',
        key: 'id'
      },
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Pedidos', 'responsavel_id');
  }
};
