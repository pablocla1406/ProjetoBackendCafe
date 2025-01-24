const Service = require('./Service');
const { Pessoa, Setor } = require('../database/models');

class SetorService extends Service{
    constructor(){
        super('Setor');
    }

    async listarListagemPaginadaSetor(page = 1, limit = 12, filters = {}){
        try {
            return await this.getPaginated(page, limit, filters);
        } catch (error) {
            throw new Error(`Error fetching paginated data for ${this.model}: ${error.message}`);
        }
    }

    async deletarSetor(id){
        try {
            const pessoasComEsseSetor = await Pessoa.findOne({
                where: { setor_id: id }
            });

            if (pessoasComEsseSetor) {
                throw new Error('Não é possível excluir um setor que já possui pessoas associadas.');
            }

            return await Setor.destroy({where: {id}});
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = SetorService;