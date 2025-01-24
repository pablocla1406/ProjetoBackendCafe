const Controller = require("./Controller");
const SetorService = require("../service/SetorService");
const { where } = require("sequelize");

const setorService = new SetorService();

class SetorController extends Controller {
    constructor() {
        super(setorService);
    }

    async ListarListagemSetores(req, res) {
        try {
            const { page = 1, limit = 12 } = req.query;

            const filters = {};
            const data = await setorService.listarListagemPaginadaSetor(
                parseInt(page),
                parseInt(limit),
                filters
            );
            
            res.status(200).json(data);
    
        } catch (error) {
            res.status(500).json({ error: error.message });
            
        }
    }

    async DeletarSetor(req, res) {
        try {
            const { id } = req.params;
            const data = await setorService.deletarSetor(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message })  ;
        }
    }

   
}

module.exports = SetorController;
