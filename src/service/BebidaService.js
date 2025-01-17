const Service = require('./Service');
const { Sequelize, Op } = require('sequelize');
const { Pedido, Bebida } = require('../database/models');

class BebidaService extends Service{
    constructor(){
        super('Bebida');
    }

    async getListagemBebida(page = 1, limit = 12, filters = {}) {
        const attributes = ['id', 'imagem', 'nome', 'preco', 'status'];
        return await this.getPaginated(page, limit, filters, attributes);
    }

    async bebidasMaisVendidas(mes, ano) {
        try {
            let whereClause = {};

            if (!mes || !ano) {
                const now = new Date();
                mes = now.getUTCMonth() + 1;
                ano = now.getUTCFullYear();
              }
            
                const startDate = new Date(Date.UTC(ano, mes - 1, 1, 0, 0, 0));
                const endDate = new Date(Date.UTC(ano, mes, 0, 23, 59, 59, 999));
                whereClause = {
                    data_compra: {
                        [Op.between]: [startDate, endDate]
                    }
                };

            const results = await Pedido.findAll({
                attributes: [
                    'bebida_id',
                    [Sequelize.fn('SUM', Sequelize.col('Pedido.quantidade')), 'quantidade']
                ],
                include: [{
                    model: Bebida,
                    as: 'bebida',
                    attributes: ['nome', 'imagem'],
                    where: {
                        deleted_at: null
                    }
                }],
                where: whereClause,
                group: ['bebida_id', 'bebida.id', 'bebida.nome', 'bebida.imagem'],
                order: [[Sequelize.fn('SUM', Sequelize.col('Pedido.quantidade')), 'DESC']],
                limit: 5,
                raw: true
            });

            return results.map(result => ({
                id: result.bebida_id,
                nome: result['bebida.nome'],
                imagem: result['bebida.imagem'],
                quantidade: parseInt(result.quantidade) || 0
            }));
        } catch (error) {
            console.error('Erro ao buscar bebidas mais vendidas:', error);
            throw error;
        }
    }
}

module.exports = BebidaService;