const { putController } = require('../controllers/api/controller.api.put');
const { cacheMethods, verifyCookie } = require('../middleware');

exports.putRoutes = [
  {
    path: '/secondBase',
    method: 'put',
    func: putController.studio,
    middleware: [verifyCookie, cacheMethods.clear],
  },
  {
    path: '/gear/:gear_type/:gear_id',
    method: 'put',
    func: putController.gear,
    middleware: [verifyCookie, cacheMethods.clear],
  },
  {
    path: '/artists/:artist_id/',
    method: 'put',
    func: putController.artist,
    middleware: [verifyCookie, cacheMethods.clear],
  },
  {
    path: '/artists/projects/:project_id',
    method: 'put',
    func: putController.project,
    middleware: [verifyCookie, cacheMethods.clear],
  },
  {
    path: '/services/:service_id',
    method: 'put',
    func: putController.service,
    middleware: [verifyCookie, cacheMethods.clear],
  },
  {
    path: '/users/:user_id',
    method: 'put',
    func: putController.user,
    middleware: [verifyCookie, cacheMethods.clear('users')],
  },
  {
    path: '/images/:collection/:img_id',
    method: 'put',
    func: putController.image,
    middleware: [verifyCookie, cacheMethods.clear],
  },
];
