const { putController } = require('../controllers/api/controller.api.put');
const { cacheMethods } = require('../middleware');

exports.putRoutes = [
  {
    path: '/secondBase',
    method: 'put',
    func: putController.studio,
    middleware: [cacheMethods.clear],
  },
  {
    path: '/gear/:gear_type/:gear_id',
    method: 'put',
    func: putController.gear,
    middleware: [cacheMethods.clear],
  },
  {
    path: '/artists/:artist_id/',
    method: 'put',
    func: putController.artist,
    middleware: [cacheMethods.clear],
  },
  {
    path: '/artists/projects/:project_id',
    method: 'put',
    func: putController.project,
    middleware: [cacheMethods.clear],
  },
  {
    path: '/services/:service_id',
    method: 'put',
    func: putController.service,
    middleware: [cacheMethods.clear],
  },
  {
    path: '/users/:user_id',
    method: 'put',
    func: putController.user,
    middleware: [cacheMethods.clear],
  },
  {
    path: '/images/:collection/:img_id',
    method: 'put',
    func: putController.image,
    middleware: [cacheMethods.clear],
  },
];
