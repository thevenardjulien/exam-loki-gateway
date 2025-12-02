// gateway/routes/stock.js
const express = require('express');
const proxy = require('express-http-proxy');
require('dotenv').config();
const router = express.Router();

const STOCK_SERVICE_URL = process.env.STOCK_SERVICE_URL;

if (STOCK_SERVICE_URL) {
  router.use('/', proxy(STOCK_SERVICE_URL, {
    proxyReqPathResolver: (req) => req.originalUrl,
  }));
} else {
  router.use('/', (req, res) => {
    res.status(503).json({ 
      error: 'Service de stock non configuré',
      message: 'STOCK_SERVICE_URL n\'est pas définie'
    });
  });
}

module.exports = router;
