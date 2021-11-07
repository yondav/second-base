const { delete_ } = require('../controllers/api/controller.api.delete');

exports.deleteRoutes = [
  {
    path: '/gear/:gear_type/:gear_id',
    method: 'delete',
    func: delete_.gear,
    middleware: [],
  },
  {
    path: '/artists/:artist_id/',
    method: 'delete',
    func: delete_.artist,
    middleware: [],
  },
  {
    path: '/artists/projects/:project_id',
    method: 'delete',
    func: delete_.project,
    middleware: [],
  },
];
