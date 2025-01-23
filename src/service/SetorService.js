const Service = require('./Service');

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
}

module.exports = SetorService;