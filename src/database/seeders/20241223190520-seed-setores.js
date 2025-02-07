'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Setores', [
      { id: 1, nome: 'Suporte', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, nome: 'Desenvolvimento', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, nome: 'Suporte / Desenvolvimento', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, nome: 'Cliente', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, nome: 'Comercial', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, nome: 'Qualidade/Testes', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, nome: 'Recepção', createdAt: new Date(), updatedAt: new Date() },
      { id: 8, nome: 'Financeiro/Faturamento', createdAt: new Date(), updatedAt: new Date() },
      { id: 9, nome: 'Mídias Sociais', createdAt: new Date(), updatedAt: new Date() },
      { id: 10, nome: 'Gerente de Suporte', createdAt: new Date(), updatedAt: new Date() },
      { id: 11, nome: 'Administrador', createdAt: new Date(), updatedAt: new Date() },
      { id: 12, nome: 'Suporte e Treinamento', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Setores', null, {});
  }
};