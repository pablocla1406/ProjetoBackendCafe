const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { Pessoa, Setor } = require('../database/models');
const PedidoService = require('../service/PedidoService');
require('dotenv').config();

class AuthController {
    
    async login(req, res) {
        const { usuario, senha } = req.body;
        const pedidoService = new PedidoService();

        try {
            const pessoa = await Pessoa.findOne({ 
                where: { usuario, status: 'Ativo' },
                include: {
                    model: Setor,
                    as: 'Setor',
                    attributes: ['nome'],
                    required: true
                }
            });

            if (!pessoa) {
                return res.status(401).json({ error: 'Usuário não encontrado' });
            }

            const senhaHash = md5(senha);
            if (pessoa.senha !== senhaHash) {
                return res.status(401).json({ error: 'Senha inválida' });
            }

            const token = jwt.sign({ id: pessoa.id, permissao: pessoa.permissao }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRATION,
            });
            
            const pedidosTotal = await pedidoService.getPedidosTotal(pessoa.id);

            const totalGasto = await pedidoService.pegarValorTotalPedidos(pessoa.id);

            const historicoMeses = await pedidoService.historicoUltimosMeses(pessoa.id);

            return res.json({
                pessoa: {
                    id: pessoa.id,
                    nome: pessoa.nome,
                    usuario: pessoa.usuario,
                    permissao: pessoa.permissao,
                    setor: pessoa.Setor.nome,
                    imagem: pessoa.imagem,
                    pedidosTotal: pedidosTotal,
                    totalGasto: totalGasto,
                    historicoUltimosMeses: historicoMeses
                },
                token,
                tipo: `Usuário com permissão: ${pessoa.permissao}`
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();