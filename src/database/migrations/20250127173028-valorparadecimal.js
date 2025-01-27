'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Pedidos', 'unitario', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    })

    await queryInterface.changeColumn('Pedidos', 'total', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Pedidos', 'unitario', {
      type: Sequelize.DECIMAL(),
      allowNull: false
    }),
  await queryInterface.changeColumn('Pedidos', 'total', {
      type: Sequelize.DECIMAL(),
      allowNull: false
    })
  }
};
