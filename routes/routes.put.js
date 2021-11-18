const { putController } = require('../controllers/api/controller.api.put');

exports.putRoutes = [
  {
    path: '/secondBase',
    method: 'put',
    func: putController.studio,
    middleware: [],
  },
  {
    path: '/gear/:gear_type/:gear_id',
    method: 'put',
    func: putController.gear,
    middleware: [],
  },
  {
    path: '/artists/:artist_id/',
    method: 'put',
    func: putController.artist,
    middleware: [],
  },
  {
    path: '/artists/projects/:project_id',
    method: 'put',
    func: putController.project,
    middleware: [],
  },
  {
    path: '/services/:service_id',
    method: 'put',
    func: putController.service,
    middleware: [],
  },
];
