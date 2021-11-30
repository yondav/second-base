const {
  deleteController,
} = require('../controllers/api/controller.api.delete');
const { cacheMethods, verifyCookie } = require('../middleware');

exports.deleteRoutes = [
  {
    path: '/gear/:gear_type/:gear_id',
    method: 'delete',
    func: deleteController.gear,
    middleware: [verifyCookie, cacheMethods.clear],
  },
  {
    path: '/artists/:artist_id/',
    method: 'delete',
    func: deleteController.artist,
    middleware: [verifyCookie, cacheMethods.clear],
  },
  {
    path: '/artists/projects/:project_id',
    method: 'delete',
    func: deleteController.project,
    middleware: [verifyCookie, cacheMethods.clear],
  },
  {
    path: '/services/:service_id',
    method: 'delete',
    func: deleteController.service,
    middleware: [verifyCookie, cacheMethods.clear],
  },
  {
    path: '/images/:collection/:img_id',
    method: 'delete',
    func: deleteController.image,
    middleware: [verifyCookie, cacheMethods.clear],
  },
];
