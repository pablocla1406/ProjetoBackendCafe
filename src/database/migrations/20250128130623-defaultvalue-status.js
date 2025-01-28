'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Pessoas', 'status', {
      type: Sequelize.ENUM,
      values: ['Ativo', 'Inativo'],
      allowNull: false,
      defaultValue: 'Ativo'
    })

    await queryInterface.changeColumn('Bebidas', 'status', {
      type: Sequelize.ENUM,
      values: ['Ativo', 'Inativo'],
      allowNull: false,
      defaultValue: 'Ativo'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Pessoas', 'status', {
      type: Sequelize.ENUM,
      values: ['Ativo', 'Inativo'],
      allowNull: false,
    })  

    await queryInterface.changeColumn('Bebidas', 'status', {
      type: Sequelize.ENUM,
      values: ['Ativo', 'Inativo'],
      allowNull: false,
    })
  }
};
