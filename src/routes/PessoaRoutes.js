const PessoaController = require('../controllers/PessoaController');
const express = require('express');

const pessoaController = new PessoaController();
const route = express.Router();

/**
 * @swagger
 * /pessoas:
 *   get:
 *     summary: Lista todas as pessoas
 *     tags: [Pessoas]
 *     responses:
 *       200:
 *         description: Lista de pessoas retornada com sucesso
 */
route.get('/pessoas', (req, res) => pessoaController.listarTodosPessoas(req, res));

/**
 * @swagger
 * /pessoas/tomamMaisCafe:
 *   get:
 *     summary: Lista as pessoas que mais tomam café
 *     tags: [Pessoas]
 *     parameters:
 *       - in: query
 *         name: mes
 *         schema:
 *           type: integer
 *         description: Mês para filtrar (1-12). Se não fornecido, busca por todos os meses
 *       - in: query
 *         name: ano
 *         schema:
 *           type: integer
 *         description: Ano para filtrar. Se não fornecido, busca por todos os anos
 *     responses:
 *       200:
 *         description: Lista das pessoas que mais tomam café
 *       500:
 *         description: Erro no servidor
 */
route.get('/pessoas/tomamMaisCafe', (req, res) => pessoaController.listarPessoasQueMaisTomamCafe(req, res));

/**
 * @swagger
 * /pessoas/listagem:
 *   get:
 *     summary: Lista pessoas com filtros
 *     tags: [Pessoas]
 *     responses:
 *       200:
 *         description: Lista filtrada de pessoas
 */
route.get('/pessoas/listagem', (req, res) => pessoaController.listarDadosFiltradosPessoas(req, res));

/**
 * @swagger
 * /pessoas/{id}:
 *   get:
 *     summary: Obtém uma pessoa pelo ID
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da pessoa a ser buscada
 *     responses:
 *       200:
 *         description: Pessoa encontrada
 *       404:
 *         description: Pessoa não encontrada
 */
route.get('/pessoas/:id', (req, res) => pessoaController.listarIdPessoa(req, res));

/**
 * @swagger
 * /pessoas/{id}:
 *   put:
 *     summary: Atualiza uma pessoa pelo ID
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da pessoa a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               imagem:
 *                 type: string
 *               usuario:
 *                 type: string
 *               senha:
 *                 type: string
 *               setor:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *               permissao:
 *                 type: string
 *                 enum: [ADMIN, USER, GUEST]
 *     responses:
 *       200:
 *         description: Pessoa atualizada com sucesso
 *       404:
 *         description: Pessoa não encontrada
 */
route.put('/pessoas/:id', (req, res) => pessoaController.atualizarPessoa(req, res));

/**
 * @swagger
 * /pessoas:
 *   post:
 *     summary: Cria uma nova pessoa
 *     tags: [Pessoas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               imagem:
 *                 type: string
 *               usuario:
 *                 type: string
 *               senha:
 *                 type: string
 *               setor:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *               permissao:
 *                 type: string
 *                 enum: [ADMIN, USER, GUEST]
 *     responses:
 *       201:
 *         description: Pessoa criada com sucesso
 */
route.post('/pessoas', (req, res) => pessoaController.criarPessoa(req, res));

/**
 * @swagger
 * /pessoas/{id}:
 *   delete:
 *     summary: Remove uma pessoa
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da pessoa a ser removida
 *     responses:
 *       200:
 *         description: Pessoa removida com sucesso
 *       404:
 *         description: Pessoa não encontrada
 */
route.delete('/pessoas/:id', (req, res) => pessoaController.DeletarData(req, res));

/**
 * @swagger
 * /pessoas/{id}/restore:
 *   patch:
 *     summary: Restaura uma pessoa
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da pessoa a ser restaurada
 *     responses:
 *       200:
 *         description: Pessoa restaurada com sucesso
 *       404:
 *         description: Pessoa não encontrada
 */
route.patch('/pessoas/:id/restore', (req, res) => pessoaController.restaurarData(req, res));

module.exports = route;
