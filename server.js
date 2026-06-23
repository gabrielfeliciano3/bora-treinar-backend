const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());

// Função auxiliar para ler nosso "Banco de Dados"
const lerBanco = () => {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Função auxiliar para salvar no "Banco de Dados"
const salvarBanco = (dados) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(dados, null, 2), 'utf8');
};

// ==========================================
// ROTA 1: GET (Lista todos os check-ins feitos)
// ==========================================
app.get('/checkins', (req, res) => {
    const checkins = lerBanco();
    res.status(200).json(checkins);
});

// ==========================================
// ROTA 2: POST (Cria um novo check-in)
// ==========================================
app.post('/checkins', (req, res) => {
    const { usuario, academiaNome, latitude, longitude } = req.body;

    // Validação básica
    if (!usuario || !academiaNome || !latitude || !longitude) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
    }

   const novoCheckin = {
        id: Date.now().toString(),
        usuario,
        academiaNome,
        latitude,
        longitude,
        bairroReal: req.body.bairroReal || "Recife", // Recebe o bairro que o app mandou
        dataHora: new Date().toLocaleString('pt-BR')
    };

    const checkins = lerBanco();
    checkins.push(novoCheckin);
    salvarBanco(checkins);

    console.log(`[NOVO CHECK-IN] ${usuario} registrou presença em: ${academiaNome}`);
    res.status(201).json({ mensagem: 'Check-in registrado!', checkin: novoCheckin });
});

app.listen(PORT, () => {
    console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
    console.log(`👉 Rota de listagem: http://localhost:${PORT}/checkins`);
});