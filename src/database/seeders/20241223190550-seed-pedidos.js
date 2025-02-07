'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Primeiro, vamos verificar se as bebidas e pessoas existem
    const bebidas = await queryInterface.sequelize.query(
      `SELECT id FROM Bebidas ORDER BY id ASC;`
    );

    const pessoas = await queryInterface.sequelize.query(
      `SELECT id FROM Pessoas ORDER BY id ASC;`
    );

    const bebidasIds = bebidas[0].map(bebida => bebida.id);
    const pessoasIds = pessoas[0].map(pessoa => pessoa.id);

    // Verificar se todas as pessoas necessárias existem
    const requiredPessoas = ['4629', '4968', '4971', '5422', '5921'];
    const missingPessoas = requiredPessoas.filter(id => !pessoasIds.includes(parseInt(id)));
    
    if (missingPessoas.length > 0) {
      throw new Error(`Pessoas com IDs ${missingPessoas.join(', ')} não encontradas. Execute primeiro o seeder de pessoas.`);
    }

    await queryInterface.bulkInsert('Pedidos', [
      { id: 902, cliente_id: 4, bebida_id: 5422, responsavel_id: 4629, data_compra: '2025-02-05', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2025-02-05 08:34:01', updatedAt: null },
      { id: 901, cliente_id: 4, bebida_id: 5422, responsavel_id: 4629, data_compra: '2025-01-28', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2025-01-28 10:12:52', updatedAt: null },
      { id: 900, cliente_id: 5, bebida_id: 4968, responsavel_id: 4629, data_compra: '2025-01-27', quantidade: 1.00, unitario: 2.30, total: 2.30, deleted_at: null, createdAt: '2025-01-27 15:23:48', updatedAt: null },
      { id: 899, cliente_id: 5, bebida_id: 4968, responsavel_id: 4629, data_compra: '2025-01-24', quantidade: 1.00, unitario: 2.30, total: 2.30, deleted_at: null, createdAt: '2025-01-24 08:29:07', updatedAt: null },
      { id: 898, cliente_id: 5, bebida_id: 5422, responsavel_id: 4971, data_compra: '2025-01-17', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2025-01-17 14:35:38', updatedAt: null },
      { id: 897, cliente_id: 5, bebida_id: 4968, responsavel_id: 4971, data_compra: '2025-01-14', quantidade: 1.00, unitario: 2.30, total: 2.30, deleted_at: null, createdAt: '2025-01-14 15:06:24', updatedAt: null },
      { id: 896, cliente_id: 5, bebida_id: 5422, responsavel_id: 4971, data_compra: '2025-01-14', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2025-01-14 08:32:19', updatedAt: null },
      { id: 895, cliente_id: 5, bebida_id: 4968, responsavel_id: 4971, data_compra: '2025-01-13', quantidade: 1.00, unitario: 2.30, total: 2.30, deleted_at: null, createdAt: '2025-01-13 14:42:09', updatedAt: null },
      { id: 894, cliente_id: 5, bebida_id: 5422, responsavel_id: 4971, data_compra: '2025-01-10', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2025-01-10 10:04:21', updatedAt: null },
      { id: 893, cliente_id: 5, bebida_id: 5422, responsavel_id: 4971, data_compra: '2025-01-09', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2025-01-10 10:04:05', updatedAt: null },
      { id: 892, cliente_id: 5, bebida_id: 5422, responsavel_id: 4971, data_compra: '2025-01-07', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2025-01-07 16:14:09', updatedAt: null },
      { id: 891, cliente_id: 5, bebida_id: 5422, responsavel_id: 4971, data_compra: '2024-12-27', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-12-27 10:25:48', updatedAt: null },
      { id: 890, cliente_id: 5, bebida_id: 5422, responsavel_id: 4971, data_compra: '2024-12-26', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-12-27 10:15:12', updatedAt: null },
      { id: 889, cliente_id: 2, bebida_id: 5422, responsavel_id: 4629, data_compra: '2024-12-21', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-12-21 11:40:15', updatedAt: null },
      { id: 888, cliente_id: 4, bebida_id: 5921, responsavel_id: 4629, data_compra: '2024-12-18', quantidade: 1.00, unitario: 2.30, total: 2.30, deleted_at: null, createdAt: '2024-12-18 09:51:42', updatedAt: null },
      { id: 887, cliente_id: 5, bebida_id: 4968, responsavel_id: 4629, data_compra: '2024-12-18', quantidade: 1.00, unitario: 2.30, total: 2.30, deleted_at: null, createdAt: '2024-12-18 09:51:29', updatedAt: null },
      { id: 886, cliente_id: 2, bebida_id: 5422, responsavel_id: 4629, data_compra: '2024-12-18', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-12-18 09:51:14', updatedAt: null },
      { id: 885, cliente_id: 5, bebida_id: 5422, responsavel_id: 4629, data_compra: '2024-12-16', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-12-16 10:19:02', updatedAt: null },
      { id: 884, cliente_id: 5, bebida_id: 5422, responsavel_id: 4629, data_compra: '2024-12-12', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-12-13 09:00:47', updatedAt: null },
      { id: 883, cliente_id: 5, bebida_id: 5422, responsavel_id: 4629, data_compra: '2024-12-10', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-12-12 08:25:15', updatedAt: null },
      { id: 882, cliente_id: 5, bebida_id: 5422, responsavel_id: 4629, data_compra: '2024-12-09', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-12-12 08:24:55', updatedAt: null },
      { id: 881, cliente_id: 5, bebida_id: 5422, responsavel_id: 4629, data_compra: '2024-12-06', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-12-12 08:24:37', updatedAt: null },
      { id: 880, cliente_id: 5, bebida_id: 4968, responsavel_id: 4629, data_compra: '2024-12-05', quantidade: 1.00, unitario: 2.30, total: 2.30, deleted_at: null, createdAt: '2024-12-05 10:37:16', updatedAt: null },
      { id: 879, cliente_id: 5, bebida_id: 4629, responsavel_id: 4629, data_compra: '2024-12-05', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-12-05 08:39:22', updatedAt: null },
      { id: 878, cliente_id: 5, bebida_id: 5422, responsavel_id: 4629, data_compra: '2024-12-04', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: '2024-12-05 08:40:01', createdAt: '2024-12-05 08:40:01', updatedAt: null },
      { id: 877, cliente_id: 5, bebida_id: 5422, responsavel_id: 4971, data_compra: '2024-11-27', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-11-27 15:45:05', updatedAt: null },
      { id: 876, cliente_id: 5, bebida_id: 5422, responsavel_id: 4971, data_compra: '2024-11-25', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-11-25 08:45:19', updatedAt: null },
      { id: 875, cliente_id: 5, bebida_id: 5422, responsavel_id: 4971, data_compra: '2024-11-19', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-11-19 15:36:56', updatedAt: null },
      { id: 874, cliente_id: 5, bebida_id: 5422, responsavel_id: 4971, data_compra: '2024-11-18', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-11-18 15:48:40', updatedAt: null },
      { id: 873, cliente_id: 5, bebida_id: 4629, responsavel_id: 4971, data_compra: '2024-11-13', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-11-14 08:46:08', updatedAt: null },
      { id: 872, cliente_id: 5, bebida_id: 5422, responsavel_id: 4971, data_compra: '2024-11-14', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-11-14 08:45:35', updatedAt: null },
      { id: 871, cliente_id: 5, bebida_id: 5422, responsavel_id: 4971, data_compra: '2024-11-07', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-11-13 08:22:41', updatedAt: null },
      { id: 870, cliente_id: 5, bebida_id: 5422, responsavel_id: 4971, data_compra: '2024-11-13', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-11-13 08:22:21', updatedAt: null },
      { id: 869, cliente_id: 5, bebida_id: 5422, responsavel_id: 4971, data_compra: '2024-11-04', quantidade: 2.00, unitario: 2.30, total: 4.60, deleted_at: null, createdAt: '2024-11-05 08:08:48', updatedAt: null },
      { id: 868, cliente_id: 5, bebida_id: 4968, responsavel_id: 4971, data_compra: '2024-11-04', quantidade: 1.00, unitario: 2.30, total: 2.30, deleted_at: null, createdAt: '2024-11-05 08:08:31', updatedAt: null }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pedidos', null, {});
  }
};