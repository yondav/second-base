const { authController } = require('../controllers/api/controller.api.auth');

exports.authRoutes = [
  {
    path: '/register',
    method: 'post',
    func: authController.register,
    middleware: [],
  },
  {
    path: '/verify',
    method: 'post',
    func: authController.verify,
    middleware: [],
  },
  {
    path: '/login',
    method: 'post',
    func: authController.login,
    middleware: [],
  },
];
