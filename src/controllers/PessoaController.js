const Controller = require("./Controller");
const PessoaService = require("../service/PessoaService");
const { Op } = require('sequelize');
const { Setor } = require('../database/models');


const pessoaService = new PessoaService();

class PessoaController extends Controller {
    constructor() {
        super(pessoaService);
    }

    async criarPessoa(req, res) {
        try {
            const data = await this.service.createPessoa(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    async listarIdPessoa(req, res) {
        try {
            const { id } = req.params;
            const data = await this.service.getByIdPessoa({ id });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }




    async listarTodosPessoas(req, res) {
        try {
            const data = await this.service.getTodasPessoascomSetor();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async listarDadosFiltradosPessoas(req, res) {
        try {
            const { 
                page = 1, 
                limit = 12, 
                nome,
                setor,
                status,
                id
            } = req.query;
            
            // Construir objeto de filtros
            const filters = {};
            const include = [{
                model: Setor,
                as: 'Setor',
                attributes: ['nome'],
                required: true
            }];

            if (id) filters.id = { [Op.like]: `%${id}%` };
            if (status) filters.status = status;
            if (nome) filters.nome = { [Op.like]: `%${nome}%` };
            if (setor) {
                include[0].where = {
                    nome: { [Op.like]: `%${setor}%` }
                };
            }

            const data = await this.service.getListagemPessoa(
                parseInt(page),
                parseInt(limit),
                filters,
                include
            );
            
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async atualizarPessoa(req, res) {
        try {
            const { id } = req.params;
            const data = await this.service.updatePessoa(id, req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    async listarPessoasQueMaisTomamCafe(req, res) {
        try {
            const { mes, ano } = req.query;

            const data = await this.service.pessoasQueMaisTomamCafe(mes, ano);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deletarPessoa(req, res) {
        try {
            const { id } = req.params;
            const data = await this.service.deletePessoa(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PessoaController;
