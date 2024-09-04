// Importa o módulo Express para criar o servidor web (se não tiver, usar o npm install express)
const express = require('express');
// Cria uma instância do aplicativo Express
const app = express();
// Define a porta do servidor (3001 neste caso, pode escolher qualquer outra)
const port = 3001;
// Analisa o corpo (body) das requisições HTTP em formato JSON
app.use(express.json());
// Servir arquivos estáticos (como HTML, CSS, imagens) a partir do diretório atual
app.use(express.static(__dirname));
// Vetor que simula um BD
let listaDeCompras = [];

// Rota GET todos os itens
app.get('/itens', (req, res) => {
    res.json(listaDeCompras);
});

// Rota POST novo item
app.post('/itens', (req, res) => {
    const novoItem = req.body;
    listaDeCompras.push(novoItem);
    res.status(201).json(novoItem);
});

// Rota PUT para atualizar um item existente
app.put('/itens/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const itemAtualizado = req.body;

    if (index >= 0 && index < listaDeCompras.length) {
        listaDeCompras[index] = itemAtualizado;
        res.json(itemAtualizado);
    } else {
        res.status(404).json({ message: 'Item não encontrado' });
    }
});

// Rota DELETE para remover um item
app.delete('/itens/:index', (req, res) => {
    const index = parseInt(req.params.index);

    if (index >= 0 && index < listaDeCompras.length) {
        listaDeCompras.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.status(404).json({ message: 'Item não encontrado' });
    }
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
