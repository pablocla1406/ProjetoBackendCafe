'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Primeiro, vamos garantir que os setores existam
    const setores = await queryInterface.sequelize.query(
      `SELECT id FROM Setores ORDER BY id ASC;`
    );

    const setoresIds = setores[0].map(setor => setor.id);

    // Verificar se todos os setores necessários existem
    const requiredSetores = ['1', '2', '5', '6', '7', '8', '10', '11'];
    const missingSetores = requiredSetores.filter(id => !setoresIds.includes(parseInt(id)));
    
    if (missingSetores.length > 0) {
      throw new Error(`Setores com IDs ${missingSetores.join(', ')} não encontrados. Execute primeiro o seeder de setores.`);
    }

    await queryInterface.bulkInsert('Pessoas', [
      { id: 19, nome: 'Luis Evaldo Appel Santana', usuario: 'luisevaldo', senha: '7eea629eed25a7ba82df4fc9d5235dc9', imagem: null, status: 'Ativo', permissao: 'ADMIN', setor_id: '11', createdAt: new Date(), updatedAt: new Date() },
      { id: 1027, nome: 'Leandro Valente', usuario: 'Leandro', senha: '202cb962ac59075b964b07152d234b70', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '5', createdAt: new Date(), updatedAt: new Date() },
      { id: 1243, nome: 'Mauricio Lima da Rosa', usuario: 'mauricio', senha: '202cb962ac59075b964b07152d234b70', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '2', createdAt: new Date(), updatedAt: new Date() },
      { id: 1792, nome: 'Marcos Ivan de Oliveira', usuario: 'marcos', senha: '5919d6f8d79d4379e86d38f9d61b5af0', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '1', createdAt: new Date(), updatedAt: new Date() },
      { id: 1879, nome: 'Massaro Telles', usuario: 'massaro', senha: '7fd1a1d31eb8366779486226837acf1f', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '2', createdAt: new Date(), updatedAt: new Date() },
      { id: 2424, nome: 'Carolaine Pereira', usuario: 'carolaine', senha: '67b4e63655366f054314061dadd539a0', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '1', createdAt: new Date(), updatedAt: new Date() },
      { id: 2470, nome: 'Ricardo Fumagalli', usuario: 'ricardo', senha: '8de1bf73885e7c7b278e4a11ff65ce71', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '10', createdAt: new Date(), updatedAt: new Date() },
      { id: 2472, nome: 'Lucien Ramos Santana', usuario: 'lucien', senha: 'ac5355da49e58e9578ea39afc30dc94e', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '11', createdAt: new Date(), updatedAt: new Date() },
      { id: 2475, nome: 'Carla Andersen Appel', usuario: 'carla', senha: '67b4e63655366f054314061dadd539a0', imagem: null, status: 'Ativo', permissao: 'ADMIN', setor_id: '8', createdAt: new Date(), updatedAt: new Date() },
      { id: 3401, nome: 'Rudimar Reginatto', usuario: 'rudimar', senha: 'e7d80ffeefa212b7c5c55700e4f7193e', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '10', createdAt: new Date(), updatedAt: new Date() },
      { id: 4129, nome: 'Rafael Rossato', usuario: 'rafael.silva', senha: 'a0678dd46c2ed239f7aa9c552706a6a0', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '2', createdAt: new Date(), updatedAt: new Date() },
      { id: 4629, nome: 'Ariele Weber de Mello', usuario: 'Ariele', senha: '91bc333f6967019ac47b49ca0f2fa757', imagem: null, status: 'Ativo', permissao: 'ADMIN', setor_id: '7', createdAt: new Date(), updatedAt: new Date() },
      { id: 4866, nome: 'Maíra Schneider', usuario: 'maira@appelsoft.com.br', senha: '45d35647966791ae6964e09da19edd5a', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '1', createdAt: new Date(), updatedAt: new Date() },
      { id: 4968, nome: 'Anderson Valente Tressoldi', usuario: 'anderson', senha: '45d35647966791ae6964e09da19edd5a', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '2', createdAt: new Date(), updatedAt: new Date() },
      { id: 4971, nome: 'Aline Rodrigues da Silva', usuario: 'Aline', senha: '80c9ef0fb86369cd25f90af27ef53a9e', imagem: null, status: 'Ativo', permissao: 'ADMIN', setor_id: '5', createdAt: new Date(), updatedAt: new Date() },
      { id: 4974, nome: 'Patricia Lago', usuario: 'patricia', senha: '202cb962ac59075b964b07152d234b70', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '1', createdAt: new Date(), updatedAt: new Date() },
      { id: 5418, nome: 'Alysson Oliveira', usuario: 'alysson.valente', senha: '45d35647966791ae6964e09da19edd5a', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '1', createdAt: new Date(), updatedAt: new Date() },
      { id: 5419, nome: 'Felipe Sinneman', usuario: 'felipeSinnemann', senha: 'f4dd44cad852ef543f7ba7d9c480d66d', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '2', createdAt: new Date(), updatedAt: new Date() },
      { id: 5422, nome: 'Patrique Santos', usuario: 'patrique.santos', senha: '45d35647966791ae6964e09da19edd5a', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '1', createdAt: new Date(), updatedAt: new Date() },
      { id: 5424, nome: 'Eduardo Machado', usuario: 'eduardo.machado', senha: '45d35647966791ae6964e09da19edd5a', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '1', createdAt: new Date(), updatedAt: new Date() },
      { id: 5759, nome: 'Eduardo de Oliveira Lima', usuario: 'Eduardo.Lima', senha: 'a4c17b230be78f37529d5885b474f01a', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '5', createdAt: new Date(), updatedAt: new Date() },
      { id: 5763, nome: 'Eduardo Oliveira', usuario: 'eduardo.oliveira', senha: '202cb962ac59075b964b07152d234b70', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '5', createdAt: new Date(), updatedAt: new Date() },
      { id: 5921, nome: 'Pablo Oliveira', usuario: 'pablo', senha: '08d73df56eabed0bb5dec9346fd8570b', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '6', createdAt: new Date(), updatedAt: new Date() },
      { id: 5923, nome: 'Fabricio  Blian', usuario: 'fabricio', senha: '45d35647966791ae6964e09da19edd5a', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '1', createdAt: new Date(), updatedAt: new Date() },
      { id: 5925, nome: 'vitor lima', usuario: 'vitor_lima', senha: '45d35647966791ae6964e09da19edd5a', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '1', createdAt: new Date(), updatedAt: new Date() },
      { id: 5926, nome: 'Gustavo', usuario: 'gustavo.gomes', senha: '45d35647966791ae6964e09da19edd5a', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '6', createdAt: new Date(), updatedAt: new Date() },
      { id: 5927, nome: 'Lucas Mello', usuario: 'lucasmello', senha: '1308dfed71297a652cc42a390e211489', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '5', createdAt: new Date(), updatedAt: new Date() },
      { id: 5929, nome: 'Leonardo Leal', usuario: 'leonardo_leal', senha: 'e10adc3949ba59abbe56e057f20f883e', imagem: null, status: 'Ativo', permissao: 'USER', setor_id: '1', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pessoas', null, {});
  }
};