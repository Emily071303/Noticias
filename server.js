require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;
const NEWS_TOKEN = process.env.NEWS_TOKEN;

app.use(cors());

// Servir carpeta public correctamente
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint top headlines
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
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Error al obtener noticias' });
  }
});

// Endpoint búsqueda
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
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Error al buscar noticias' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});