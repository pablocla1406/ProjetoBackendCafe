

function processarCSVTabela(conteudo) {
    try {
        // Verifica se o conteúdo existe
        if (!conteudo) {
            throw new Error('Conteúdo do arquivo está vazio');
        }

        // Remove aspas extras e divide as linhas
        const linhas = conteudo
            .split('\n')
            .map(linha => linha.trim().replace(/"/g, '')) // Remove aspas
            .filter(linha => linha.length > 0);

        // Verifica se há linhas suficientes
        if (linhas.length < 2) {
            throw new Error('Arquivo não contém dados suficientes');
        }

        // Remove o cabeçalho
        const cabecalho = linhas.shift();
        
        // Processa as linhas de dados
        return linhas.map(linha => {
            const [mesAno, cliente, vezesComprou, valorTotal] = linha.split(';').map(item => item ? item.trim() : '');
            
            // Validação dos campos
            if (!mesAno || !cliente || !vezesComprou || !valorTotal) {
                throw new Error('Linha com dados incompletos: ' + linha);
            }

            return {
                mesAno,
                cliente,
                vezesComprou: parseInt(vezesComprou) || 0,
                valorTotal: parseFloat(valorTotal.replace(',', '.')) || 0
            };
        });
    } catch (error) {
        console.error('Erro ao processar CSV:', error);
        throw new Error('Erro ao processar arquivo: ' + error.message);
    }
}

module.exports = processarCSVTabela;