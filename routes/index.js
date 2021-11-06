const express = require('express');
const router = express.Router();

const { getRoutes } = require('./routes.get');
const { postRoutes } = require('./routes.post');

const api = [...getRoutes, ...postRoutes];

api.map(route => {
  let { path, method, func, middleware } = route;

  switch (method) {
    case 'get':
      router.route(path).get(...middleware, func);
      break;
    case 'post':
      router.route(path).post(...middleware, func);
      break;
    case 'put':
      router.route(path).put(...middleware, func);
      break;
    case 'delete':
      router.route(path).delete(...middleware, func);
      break;
    default:
      break;
  }
});

module.exports = router;
