const { getController } = require('../controllers/api/controller.api.get');
const { cacheMethods } = require('../middleware');

exports.getRoutes = [
  {
    path: '/secondBase',
    method: 'get',
    func: getController.studio,
    middleware: [cacheMethods.get, cacheMethods.set],
  },
  {
    path: '/studio_gear',
    method: 'get',
    func: getController.studio_gear,
    middleware: [cacheMethods.get, cacheMethods.set],
  },
  {
    path: '/services',
    method: 'get',
    func: getController.services,
    middleware: [cacheMethods.get, cacheMethods.set],
  },
  {
    path: '/artists',
    method: 'get',
    func: getController.artists,
    middleware: [cacheMethods.get, cacheMethods.set],
  },
  {
    path: '/users',
    method: 'get',
    func: getController.user,
    middleware: [cacheMethods.get, cacheMethods.set],
  },
];
