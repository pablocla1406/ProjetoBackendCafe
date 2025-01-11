const Service = require('./Service');
const { Setor } = require('../database/models');
const {Pessoa} = require('../database/models');

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
}

module.exports = PessoaService;