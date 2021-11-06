const { get } = require('../controllers/api/controller.api.get');

exports.getRoutes = [
  {
    path: '/secondBase',
    method: 'get',
    func: get.studio,
    middleware: [],
  },
  {
    path: '/studio_gear',
    method: 'get',
    func: get.studio_gear,
    middleware: [],
  },
  {
    path: '/artists',
    method: 'get',
    func: get.artists,
    middleware: [],
  },
];
