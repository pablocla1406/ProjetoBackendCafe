const criarImagemRelatorio = require('../utils/discord/CriarImagemRelatorio');
const FormData = require('form-data');

let fetch;

(async () => {
    fetch = (await import('node-fetch')).default;
})();

class DiscordController {

    async enviarRelatorioDiscord(req, res) {
        const { content } = req.body;
        const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    try {
        const fileContent = file.buffer.toString('utf-8');
        
        const imagemBuffer = await criarImagemRelatorio(fileContent);
        
        const formData = new FormData();
        formData.append('content', content || '📊 Relatório de Vendas do Café:');
        formData.append('file', Buffer.from(imagemBuffer), {
            filename: 'relatorio.png',
            contentType: 'image/png'
        });

        const response = await fetch(webhookUrl, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            res.status(200).json({ success: true, message: 'Relatório enviado com sucesso' });
        } else {
            res.status(500).json({ success: false, message: 'Erro ao enviar relatório' });
        }
    } catch (error) {
        console.error('Erro detalhado:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}
}

module.exports = new DiscordController();