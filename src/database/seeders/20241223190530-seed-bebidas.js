'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bebidas', [
      { 
        id: 1,
        nome: 'Cappuccino',
        descricao: 'Descrição não informada',
        preco: 2.50,
        imagem: null,
        status: 'Ativo',
        deleted_at: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nome: 'Mocaccino',
        descricao: 'Descrição não informada',
        preco: 2.50,
        imagem: null,
        status: 'Ativo',
        deleted_at: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nome: 'Café Normal com Leite',
        descricao: 'Descrição não informada',
        preco: 2.50,
        imagem: null,
        status: 'Ativo',
        deleted_at: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        nome: 'Cappuccino c/ Canela',
        descricao: 'Descrição não informada',
        preco: 2.50,
        imagem: null,
        status: 'Ativo',
        deleted_at: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        nome: 'Chocolate',
        descricao: 'Descrição não informada',
        preco: 2.50,
        imagem: null,
        status: 'Ativo',
        deleted_at: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bebidas', null, {});
  }
};