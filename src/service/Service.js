const dataSource =  require('../database/models')

class Service {
    constructor(model) {
        this.model = model;
    }

    async getPaginated(page = 1, limit = 12, filters = {}, attributes = null) {
        try {
            const offset = (page - 1) * limit;
            const queryOptions = {
                where: filters,
                limit,
                offset,
                order: [['id', 'DESC']]
            };

            if (attributes) {
                queryOptions.attributes = attributes;
            }

            const { count, rows } = await dataSource[this.model].findAndCountAll(queryOptions);

            return {
                items: rows,
                totalItems: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
                itemsPerPage: limit
            };
        } catch (error) {
            throw new Error(`Error fetching paginated data for ${this.model}: ${error.message}`);
        }
    }

    async getAll(filters = {}, attributes = null, options = {}){
        try {
            const queryOptions = {
                ...options,
                where: filters || {}
            };

            if (attributes) {
                queryOptions.attributes = attributes;
            }

            const data = await dataSource[this.model].findAll(queryOptions);
            return data;
        } catch (error) {
            throw new Error(`Error fetching data for ${this.model}: ${error.message}`);
        }
    }

   
   

    async getById(id, options = {}) {
        try {
            const numericId = parseInt(id, 10);
            if (isNaN(numericId)) {
                throw new Error('ID deve ser um número válido');
            }
            const result = await dataSource[this.model].findByPk(numericId, options);
            if (!result) {
                throw new Error('Registro não encontrado');
            }
            return result;
        } catch (error) {
            console.error('Service getById - Erro:', error.message);
            throw new Error(`Error fetching data by ID for ${this.model}: ${error.message}`);
        }
    }

    async putData(params, data) {
        try {
            return await dataSource[this.model].update(data, { where: { ...params } });
        } catch (error) {
            throw new Error(`Error updating data for ${this.model}: ${error.message}`);
        }
    }


    async createData(data) {
        try {
            return await dataSource[this.model].create(data);
        } catch (error) {
            throw new Error(`Error creating data for ${this.model}: ${error.message}`);
        }
    }

    async deleteData(params) {
        try {
            return await dataSource[this.model].destroy({ where: { ...params } });
        } catch (error) {
            throw new Error(`Error deleting data for ${this.model}: ${error.message}`);
        }
    }


    async restaurarRegistro(id) {
        try {
            const registro = await dataSource[this.model].findOne({
                where: { id: id }
            });

            if (registro) {
                throw new Error('Você não pode restaurar um registro que ainda existe');
            }

            await dataSource[this.model].restore({
                where: { id: id }
            });

            return registro;
        } catch (error) {
            throw new Error(`Error restoring record for ${this.model}: ${error.message}`);
        }
    }
}

module.exports = Service;