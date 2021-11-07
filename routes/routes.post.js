const { postController } = require('../controllers/api/controller.api.post');

exports.postRoutes = [
  {
    path: '/secondBase',
    method: 'post',
    func: postController.studio,
    middleware: [],
  },
  {
    path: '/gear/:gear_type',
    method: 'post',
    func: postController.gear,
    middleware: [],
  },
  {
    path: '/artists',
    method: 'post',
    func: postController.artist,
    middleware: [],
  },
  {
    path: '/artists/:artist_id/projects',
    method: 'post',
    func: postController.project,
    middleware: [],
  },
];
