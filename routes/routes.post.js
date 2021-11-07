const { post } = require('../controllers/api/controller.api.post');

exports.postRoutes = [
  {
    path: '/secondBase',
    method: 'post',
    func: post.studio,
    middleware: [],
  },
  {
    path: '/gear/:gear_type',
    method: 'post',
    func: post.gear,
    middleware: [],
  },
  {
    path: '/artists',
    method: 'post',
    func: post.artist,
    middleware: [],
  },
  {
    path: '/artists/:artist_id/projects',
    method: 'post',
    func: post.project,
    middleware: [],
  },
];
