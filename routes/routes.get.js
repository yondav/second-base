const { getController } = require('../controllers/api/controller.api.get');

exports.getRoutes = [
  {
    path: '/secondBase',
    method: 'get',
    func: getController.studio,
    middleware: [],
  },
  {
    path: '/studio_gear',
    method: 'get',
    func: getController.studio_gear,
    middleware: [],
  },
  {
    path: '/services',
    method: 'get',
    func: getController.services,
    middleware: [],
  },
  {
    path: '/artists',
    method: 'get',
    func: getController.artists,
    middleware: [],
  },
  {
    path: '/users',
    method: 'get',
    func: getController.user,
    middleware: [],
  },
];
