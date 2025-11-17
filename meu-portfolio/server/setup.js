import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import process from 'process'; // <--- ADICIONADO AQUI

dotenv.config();

const dbConfig = {
  uri: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description JSON,
        media_url JSON,
        media_type ENUM('image', 'video') DEFAULT 'image',
        test_link VARCHAR(255),
        github_link VARCHAR(255),
        is_github_private BOOLEAN DEFAULT FALSE,
        category VARCHAR(100),
        technologies JSON,
        order_index INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

const insertDataQuery = `
    INSERT INTO projects (name, description, media_url, media_type, github_link, is_github_private, category, technologies, order_index)
    VALUES 
    (
        'CineSearch - Hub de Filmes',
        '{"pt": "Plataforma web que oferece experiência completa para amantes de cinema. Integração com Azure AI para identificar filmes por imagens.", "en": "Web platform for movie lovers featuring Azure AI integration to identify movies from uploaded images."}',
        '["https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80"]', 
        'image',
        'https://github.com/ICEI-PUC-Minas-CC-TI/plmg-cc-ti4-2025-2-g01-stepup',
        FALSE,
        'Web Dev',
        '["JavaScript", "Java", "Azure AI", "HTML/CSS"]',
        1
    ),
    (
        'App de Previsão do Tempo',
        '{"pt": "Aplicação Desktop com interface gráfica (GUI) que consome a API OpenWeatherMap para dados meteorológicos em tempo real.", "en": "Desktop GUI application fetching real-time meteorological data via OpenWeatherMap API."}',
        '["https://images.unsplash.com/photo-1592210454132-63e16127f1a8?auto=format&fit=crop&w=800&q=80"]',
        'image',
        'https://github.com/acmachado48/Weather-App',
        FALSE,
        'Desktop',
        '["Python", "PyQt5", "API Rest"]',
        2
    ),
    (
        'Classificador de Imagens CNN',
        '{"pt": "Rede Neural Convolucional treinada para classificação binária de imagens (Gatos vs Cães) usando Keras.", "en": "Convolutional Neural Network trained for binary image classification (Cats vs Dogs) using Keras."}',
        '["https://images.unsplash.com/photo-1633412802994-feb0c3f20e28?auto=format&fit=crop&w=800&q=80"]',
        'image',
        'https://github.com/acmachado48/IA/tree/main/CNN',
        FALSE,
        'AI & Data',
        '["Python", "Keras", "Deep Learning"]',
        3
    ),
    (
        'Fitlab - App de Treinos',
        '{"pt": "Aplicativo mobile para gestão de treinos com autenticação e banco de dados em tempo real via Firebase.", "en": "Mobile fitness tracking app featuring Firebase authentication and real-time database."}',
        '["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"]',
        'image',
        'https://github.com/acmachado48/Fitlab-Flutter',
        FALSE,
        'Mobile',
        '["Flutter", "Firebase", "Dart"]',
        4
    );
`;

async function setupDatabase() {
  let connection;
  try {
    console.log('🔌 Conectando ao Aiven...');
    connection = await mysql.createConnection(dbConfig);

    console.log('🛠️ Criando tabela...');
    await connection.query(createTableQuery);
    console.log('✅ Tabela criada!');

    const [rows] = await connection.query(
      'SELECT COUNT(*) as count FROM projects'
    );
    if (rows[0].count === 0) {
      console.log('📝 Inserindo projetos...');
      await connection.query(insertDataQuery);
      console.log('✅ Projetos inseridos com sucesso!');
    } else {
      console.log('ℹ️ A tabela já contém dados. Pulando inserção.');
    }
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    if (connection) await connection.end();
    process.exit();
  }
}

setupDatabase();
