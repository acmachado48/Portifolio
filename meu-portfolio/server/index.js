import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';

// Carrega as variáveis do arquivo .env
// Se você estiver rodando o comando "node index.js" de DENTRO da pasta server, use apenas config()
// Se estiver rodando da raiz do projeto, pode precisar de config({ path: './server/.env' })
dotenv.config();

const app = express();

// Permite que o React (Front-end) acesse este servidor
app.use(cors());
app.use(express.json());

// Configuração da conexão com Aiven
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL, // A URL gigante que você pegou na Aiven
  ssl: {
    rejectUnauthorized: false, // Permite conectar sem baixar o certificado CA manualmente
  },
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

// Rota de teste para ver se o servidor está de pé
app.get('/', (req, res) => {
  res.send('API do Portfólio está rodando!');
});

// Rota para buscar os projetos do Banco de Dados
app.get('/api/projects', async (req, res) => {
  try {
    // Busca projetos ativos ordenados pelo índice que você definir
    const [rows] = await pool.query(
      'SELECT * FROM projects WHERE is_active = 1 ORDER BY order_index ASC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    res
      .status(500)
      .json({ error: 'Erro ao buscar projetos no banco de dados.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
