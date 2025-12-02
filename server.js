// gateway/server.js
const express = require('express');
const dotenv = require('dotenv');
//const authProxy = require('./routes/auth');
const notifiProxy = require('./routes/notifi');
const stockProxy = require('./routes/stock');

dotenv.config();

const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Route de santé pour vérifier que le gateway fonctionne
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'gateway' });
});

// Routes principales pour chaque microservice
//app.use('/auth', authProxy);
app.use('/notify', notifiProxy);
app.use('/update-stock', stockProxy);

// Middleware pour gérer les erreurs (doit être après toutes les routes)
app.use((err, req, res, next) => {
  console.error('Erreur:', err);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Lancer le Gateway
const PORT = process.env.GATEWAY_PORT || 8000;
const HOST = process.env.GATEWAY_HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Gateway opérationnel sur ${HOST}:${PORT}`);
});