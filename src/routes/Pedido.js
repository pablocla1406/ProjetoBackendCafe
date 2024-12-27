const PedidoController = require('../controller/PedidoController')
const express = require('express')

const pedidoController = new PedidoController()
const route = express.Router()

route.get('/pedidos', (req, res) => pedidoController.ListarData(req, res))
route.get('/pedidos/:id', (req, res) => pedidoController.ListarId(req, res))
route.put('/pedidos/:id', (req, res) => pedidoController.ModificarData(req, res))
route.post('/pedidos', (req, res) => pedidoController.CriarData(req, res))
route.delete('/pedidos/:id', (req, res) => pedidoController.DeletarData(req, res))

module.exports = route
