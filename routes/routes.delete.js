const {
  deleteController,
} = require('../controllers/api/controller.api.delete');

exports.deleteRoutes = [
  {
    path: '/gear/:gear_type/:gear_id',
    method: 'delete',
    func: deleteController.gear,
    middleware: [],
  },
  {
    path: '/artists/:artist_id/',
    method: 'delete',
    func: deleteController.artist,
    middleware: [],
  },
  {
    path: '/artists/projects/:project_id',
    method: 'delete',
    func: deleteController.project,
    middleware: [],
  },
];
