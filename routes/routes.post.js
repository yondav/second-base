const { postController } = require('../controllers/api/controller.api.post');
const { cacheMethods } = require('../middleware');

exports.postRoutes = [
  {
    path: '/secondBase',
    method: 'post',
    func: postController.studio,
    middleware: [cacheMethods.clear],
  },
  {
    path: '/gear/:gear_type',
    method: 'post',
    func: postController.gear,
    middleware: [cacheMethods.clear],
  },
  {
    path: '/artists',
    method: 'post',
    func: postController.artist,
    middleware: [cacheMethods.clear],
  },
  {
    path: '/artists/:artist_id/projects',
    method: 'post',
    func: postController.project,
    middleware: [cacheMethods.clear],
  },
  {
    path: '/services',
    method: 'post',
    func: postController.service,
    middleware: [cacheMethods.clear],
  },
  {
    path: '/images/:parent_collection/:sub_collection/:parent_id',
    method: 'post',
    func: postController.image,
    middleware: [cacheMethods.clear],
  },
  {
    path: '/images/:parent_collection/:parent_id',
    method: 'post',
    func: postController.image,
    middleware: [cacheMethods.clear],
  },
];
