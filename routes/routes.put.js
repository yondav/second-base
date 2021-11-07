const { put } = require('../controllers/api/controller.api.put');

exports.putRoutes = [
  {
    path: '/secondBase',
    method: 'put',
    func: put.studio,
    middleware: [],
  },
  {
    path: '/gear/:gear_type/:gear_id',
    method: 'put',
    func: put.gear,
    middleware: [],
  },
  {
    path: '/artists/:artist_id/',
    method: 'put',
    func: put.artist,
    middleware: [],
  },
  {
    path: '/artists/projects/:project_id',
    method: 'put',
    func: put.project,
    middleware: [],
  },
];
