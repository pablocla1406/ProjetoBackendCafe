const Service = require('./Service');
const {Pessoa, Setor, Pedido} = require('../database/models');
const { Op, Sequelize } = require('sequelize');

class PessoaService extends Service {
  constructor() {
    super('Pessoa');
  }


  async getByIdPessoa(params) {
    try {
      const item = await Pessoa.findOne({ 
        where: { id: params.id },
        include: [{
          model: Setor,
          as: 'Setor',
          attributes: ['id', 'nome'],
          required: true
        }]
      });

      if (!item) {
        throw new Error('Pessoa não encontrada');
      }

      const plainItem = item.get({ plain: true });
      return {
        id: plainItem.id,
        nome: plainItem.nome,
        imagem: plainItem.imagem,
        usuario: plainItem.usuario,
        setor: {
          id: plainItem.Setor.id,
          nome: plainItem.Setor.nome
        },
        permissao: plainItem.permissao
      };

    } catch (error) {
      throw new Error(`Error fetching pessoa: ${error.message}`);
    }
  }

  async createPessoa(data) {
    try {
      // Se receber setor ao invés de setor_id, faz a adaptação
      if (data.setor && !data.setor_id) {
        data.setor_id = data.setor.id || data.setor;
        delete data.setor;
      }
  
      const novaPessoa = await Pessoa.create(data);
      
      // Retorna a pessoa criada com os dados do setor
      return this.getByIdPessoa({ id: novaPessoa.id });
    } catch (error) {
      throw new Error(`Erro ao criar pessoa: ${error.message}`);
    }
  }

  async updatePessoa(id, data) {
    try {
      // Se receber setor ao invés de setor_id, faz a adaptação
      if (data.setor && !data.setor_id) {
        data.setor_id = data.setor.id || data.setor;
        delete data.setor;
      }

      await Pessoa.update(data, {
        where: { id }
      });
      
      // Retorna a pessoa atualizada com os dados do setor
      return this.getByIdPessoa({ id });
    } catch (error) {
      throw new Error(`Erro ao atualizar pessoa: ${error.message}`);
    }
  }
  

  async getTodasPessoascomSetor() {
    try {
      const pessoas = await Pessoa.findAll({
        include: [{
          model: Setor,
          as: 'Setor',
          attributes: ['id', 'nome'],
          required: true
        }]
      });

      const transformedPessoas = pessoas.map(pessoa => {
        const plainPessoa = pessoa.get({ plain: true });
        return {
          id: plainPessoa.id,
          imagem: plainPessoa.imagem,
          nome: plainPessoa.nome,
          setor: {
            id: plainPessoa.Setor.id,
            nome: plainPessoa.Setor.nome
          },
          usuario: plainPessoa.usuario,
          senha: plainPessoa.senha,
          permissao: plainPessoa.permissao
        };
      });

      return transformedPessoas;
    } catch (error) {
      throw new Error(`Error fetching pessoas: ${error.message}`);
    }
  }

  async getListagemPessoa(page = 1, limit = 12, filters = {}, include = []) {
    try {
      const offset = (page - 1) * limit;
      
      // Merge dos includes padrão com os includes recebidos
      const mergedIncludes = include.map(inc => ({
        ...inc,
        required: true
      }));

      const allItems = await this.getAll(filters, null, {
        attributes: ['id', 'imagem', 'nome', 'setor_id'],
        include: mergedIncludes,
        limit,
        offset,
        order: [['id', 'DESC']]
      });
      
      const count = await Pessoa.count({ 
        where: filters,
        include: mergedIncludes
      });
      
      const transformedItems = allItems.map(item => {
        const plainItem = item.get({ plain: true });
        return {
          id: plainItem.id,
          imagem: plainItem.imagem,
          nome: plainItem.nome,
          setor: plainItem.Setor.nome
        };
      });

      return {
        items: transformedItems,
        totalItems: count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        itemsPerPage: parseInt(limit)
      };
    } catch (error) {
      throw new Error(`Error fetching paginated pessoas: ${error.message}`);
    }
  }


  async pessoasQueMaisTomamCafe(mes, ano){
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

      const result = await Pedido.findAll({
        attributes: [
          'cliente_id',
          [Sequelize.fn('SUM', Sequelize.col('Pedido.quantidade')), 'vezesComprou']
        ],
        include: [{
          model: Pessoa,
          as: 'cliente',
          attributes: ['nome', 'imagem']
        }],
        where: whereClause,
        group: ['cliente_id', 'cliente.id', 'cliente.nome', 'cliente.imagem'],
        order: [[Sequelize.fn('SUM', Sequelize.col('Pedido.quantidade')), 'DESC']],
        limit: 5,
        raw: true
      });

      return result.map(item => ({
        id: item.cliente_id,
        nome: item['cliente.nome'],
        imagem: item['cliente.imagem'],
        vezesComprou: Number(item.vezesComprou)
      }));

    } catch (error) {
      throw new Error(`Error fetching pessoas que mais tomam café: ${error.message}`);
    }
  }

  async deletePessoa(id) {
    try {
      const pedidosVinculados = await Pedido.findOne({
        where: {
          cliente_id: id
        }
      });

      if (pedidosVinculados) {
        throw new Error('Não é possível excluir esta pessoa pois existem pedidos vinculados a ela.');
      }

      return await Pessoa.destroy({ where: { id } });
    } catch (error) {
      throw new Error(`Erro ao excluir pessoa: ${error.message}`);
    }
  }
}

module.exports = PessoaService;