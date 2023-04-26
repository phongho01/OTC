const express = require('express');
const router = express.Router();
const orderRoutes = require('./order.route');

const defaultRoutes = [
  {
    routes: orderRoutes,
    path: '/orders'
  }
]

defaultRoutes.forEach(item => router.use(item.path, item.routes));

module.exports = router