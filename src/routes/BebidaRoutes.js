const BebidaController = require('../controllers/BebidaController')
const express = require('express')

const bebidaController = new BebidaController()
const route = express.Router()


/**
 * @swagger
 * /bebidas:
 *   get:
 *     summary: Lista bebidas 
 *     tags: [Bebidas]
 *     responses:
 *       200:
 *         description: Lista Bebidas
 */
route.get('/bebidas', (req, res) => bebidaController.listarBebidasAtivas(req, res))



/**
 * @swagger
 * /bebidas/maisvendidas:
 *   get:
 *     summary: Lista bebidas mais vendidas
 *     tags: [Bebidas]
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
 *         description: Lista das bebidas mais vendidas
 */
route.get('/bebidas/maisvendidas', (req, res) => bebidaController.listarBebidasMaisVendidas(req, res))


/**
 * @swagger
 * /bebidas/listagem:
 *   get:
 *     summary: Lista bebidas com filtros e paginação
 *     tags: [Bebidas]
 *     responses:
 *       200:
 *         description: Lista filtrada de bebidas
 */
route.get('/bebidas/listagem', (req, res) => bebidaController.listarDadosFiltradosBebidas(req, res))

/**
 * @swagger
 * /bebidas/{id}:
 *   get:
 *     summary: Obtém uma bebida pelo ID
 *     tags: [Bebidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bebida encontrada
 *       404:
 *         description: Bebida não encontrada
 */
route.get('/bebidas/:id', (req, res) => bebidaController.ListarId(req, res))

/**
 * @swagger
 * /bebidas/{id}:
 *   put:
 *     summary: Atualiza uma bebida
 *     tags: [Bebidas]
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
 *               descricao:
 *                 type: string
 *               imagem:
 *                 type: string
 *               preco:
 *                 type: number
 *               status:
 *                 type: Enum
 *     responses:
 *       200:
 *         description: Bebida atualizada com sucesso
 *       404:
 *         description: Bebida não encontrada
 */
route.put('/bebidas/:id', (req, res) => bebidaController.ModificarData(req, res))

/**
 * @swagger
 * /bebidas:
 *   post:
 *     summary: Cria uma nova bebida
 *     tags: [Bebidas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               imagem:
 *                 type: string
 *               preco:
 *                 type: number
 *               status:
 *                 type: Enum
 *     responses:
 *       201:
 *         description: Bebida criada com sucesso
 */
route.post('/bebidas', (req, res) => bebidaController.CriarData(req, res))

/**
 * @swagger
 * /bebidas/{id}:
 *   delete:
 *     summary: Remove uma bebida
 *     tags: [Bebidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bebida removida com sucesso
 *       404:
 *         description: Bebida não encontrada
 */
route.delete('/bebidas/:id', (req, res) => bebidaController.deletarBebida(req, res))


/**
 * @swagger
 * /bebidas/{id}/restore:
 *   patch:
 *     summary: Restaura uma bebida (A coluna deleted_at recebe NULL)
 *     tags: [Bebidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bebida restaurada com sucesso
 *       404:
 *         description: Bebida não encontrada
 */
route.patch('/bebidas/:id/restore', (req, res) => bebidaController.restaurarData(req, res))


route.patch('/bebidas/:id/ativarouinativar', (req, res) => bebidaController.ativarInativarBebida(req, res))



module.exports = route
