class Controller{
    constructor(service){
        this.service = service;
    }

    async ListarData(req, res){
        try {
            const data = await this.service.getAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async ListarId(req, res){
        try {
            const {id} = req.params;
            console.log('Controller ListarId - ID dos parâmetros:', id, 'tipo:', typeof id);
            const data = await this.service.getById(id);
            res.status(200).json(data);
        } catch (error) {
            console.error('Controller ListarId - Erro:', error.message);
            if (error.message.includes('ID deve ser um número válido')) {
                res.status(400).json({ error: 'ID inválido: deve ser um número' });
            } else if (error.message.includes('Registro não encontrado')) {
                res.status(404).json({ error: 'Registro não encontrado' });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async ModificarData(req, res){
        try{
            const {id} = req.params;
            const data = await this.service.putData({ id: id }, req.body);
            res.status(200).json(data);
        }
        catch(error){
            res.status(500).json({ error: error.message });
        }
    }

    async CriarData(req, res){
        try {
            const data = await this.service.createData(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async DeletarData(req, res){
        try{
            const {id} = req.params;
            const data = await this.service.deleteData({ id });
            res.status(200).json(data);
        }
        catch(error){
            res.status(500).json({ error: error.message });
        }
    }


    async restaurarData(req, res){
        try{
            const {id} = req.params;
            const data = await this.service.restaurarRegistro(id);
            res.status(200).json(data);
        }
        catch(error){
            res.status(500).json({ error: error.message });
        }
    }

    async listarListagemPaginado(req, res){
        try {
            const { page = 1, limit = 12 } = req.query;

            const data = await this.service.getPaginated(page, limit);
            res.status(200).json(data);

        } catch (error) {
            res.status(500).json({ error: error.message });
            
        }
    }

}

module.exports = Controller;