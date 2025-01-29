const Controller = require('./Controller');
const BebidaService = require('../service/BebidaService');
const { Op } = require('sequelize'); // Add this line to import Op from sequelize

const bebidaService = new BebidaService();

class BebidaController extends Controller{
    constructor(){
        super(bebidaService);
    }


    async ListaPorIdBebida(req, res){
        try{
            const {id} = req.params;
            const data = await this.service.getById(id);
            res.status(200).json(data);
        }
        catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async listarDadosFiltradosBebidas(req, res){
        try{
            const { page = 1, limit = 12, id, nome, preco, status } = req.query;
            
            // Construir objeto de filtros
            const filters = {};
            if (id) filters.id = { [Op.like]: `%${id}%` };
            if (nome) filters.nome = { [Op.like]: `%${nome}%` };
            if (status) filters.status = { [Op.like]: `%${status}%` };

            const data = await this.service.getListagemBebida(
                parseInt(page),
                parseInt(limit),
                filters
            );
            
            res.status(200).json(data);
        }
        catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async deletarBebida(req, res){
        try{
            const {id} = req.params;
            const data = await this.service.deleteBebida(id);
            res.status(200).json(data);
        }
        catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async listarBebidasMaisVendidas(req, res){
        try{
            const {mes, ano} = req.query;

            const data = await this.service.bebidasMaisVendidas(mes, ano);
            res.status(200).json(data);
        }
        catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async ativarInativarBebida(req, res){
        try{
            const {id} = req.params;
            const data = await this.service.AtivarOuInativarBebida(id);
            res.status(200).json(data);
        }
        catch(error){
            res.status(500).json({error: error.message});
        }
    }



    async listarBebidasAtivas(req, res){
        try{
            const {statusBebida} = req.query;
            const data = await this.service.getBebidasAtivas(statusBebida);
            res.status(200).json(data);
        }
        catch(error){
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = BebidaController;