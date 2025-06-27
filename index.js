const { Pool } = require('pg'); // módulo para PostgreSQL

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // vem do Render
  ssl: {
    rejectUnauthorized: false // necessário para Supabase funcionar
  }
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ dbTime: result.rows[0].now });
  } catch (err) {
    console.error('Erro na conexão com o banco_:', err);
    res.status(500).send('Erro ao conectar ao banco');
  }
});