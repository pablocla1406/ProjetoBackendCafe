const SetorController = require('../controllers/SetorController')
const express = require('express')

const setorController = new SetorController
const route = express.Router()

/**
 * @swagger
 * /setores:
 *   get:
 *     summary: Lista todos os setores
 *     tags: [Setores]
 *     responses:
 *       200:
 *         description: Lista de setores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 */
route.get('/setores', (req, res) => setorController.ListarData(req, res))





/**
 * @swagger
 * /setores/listagem:
 *   get:
 *     summary: Lista setores com paginação
 *     tags: [Setores]
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *         description: Número da página (iniciando em 1)
 *       - in: query
 *         name: itensPorPagina
 *         schema:
 *           type: integer
 *         description: Quantidade de itens por página (padrão: 10)
 *     responses:
 *       200:
 *         description: Lista de setores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                 meta:
 *                   type: object
 *                   properties:
 *                     pagina:
 *                       type: integer
 *                     itensPorPagina:
 *                       type: integer
 *                     totalItens:
 *                       type: integer
 *                     totalPaginas:
 *                       type: integer
 */
route.get('/setores/listagem', (req, res) => setorController.ListarListagemSetores(req, res))

/**
 * @swagger
 * /setores/{id}:
 *   get:
 *     summary: Obtém um setor pelo ID
 *     tags: [Setores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Setor encontrado
 *       404:
 *         description: Setor não encontrado
 */
route.get('/setores/:id', (req, res) => setorController.ListarId(req, res))

/**
 * @swagger
 * /setores/{id}:
 *   put:
 *     summary: Atualiza um setor
 *     tags: [Setores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       200:
 *         description: Setor atualizado com sucesso
 *       404:
 *         description: Setor não encontrado
 */
route.put('/setores/:id', (req, res) => setorController.ModificarData(req, res))

/**
 * @swagger
 * /setores:
 *   post:
 *     summary: Cria um novo setor
 *     tags: [Setores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Setor criado com sucesso
 */
route.post('/setores', (req, res) => setorController.CriarData(req, res))

/**
 * @swagger
 * /setores/{id}:
 *   delete:
 *     summary: Remove um setor
 *     tags: [Setores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Setor removido com sucesso
 *       404:
 *         description: Setor não encontrado
 */
route.delete('/setores/:id', (req, res) => setorController.DeletarSetor(req, res))

module.exports = route
