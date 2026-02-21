require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public'));

const NEWS_TOKEN = process.env.NEWS_TOKEN;
const PORT = process.env.PORT || 5000;

// Endpoint de noticias principales
app.get('/api/noticias/top', async (req, res) => {
  try {
    const { categoria, pais } = req.query;
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        category: categoria,
        country: pais,
        apiKey: NEWS_TOKEN
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error al obtener noticias' });
  }
});

// Endpoint de búsqueda
app.get('/api/noticias/buscar', async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q,
        apiKey: NEWS_TOKEN
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error al buscar noticias' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});