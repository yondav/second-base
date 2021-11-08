const { User } = require('../../models');
const ErrorResponse = require('../../utils/errorResponse');
// const crypto = require('crypto');

exports.authController = {
  register: async (req, res, next) => {
    const response = await User.find();

    if (response.length)
      return next(
        new ErrorResponse('Maximum number of accounts reached!', 403)
      );

    try {
      const user = new User(req.body);
      await user.save();

      sendToken(user, 201, res);
    } catch (err) {
      next(err);
    }
  },
  verify: async (req, res, next) => {
    const { token } = req.body;

    if (!token) return next(new ErrorResponse('No token', 400));

    try {
      const user = await User.findOne({ email: 'secondbase.space@gmail.com' });

      if (!user) return next(new ErrorResponse('Not a valid user', 400));

      verifyToken(user, token, 200, res);
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(
        new ErrorResponse('Please provide an email and password', 400)
      );

    try {
      const user = await User.findOne({ email }).select('+password');

      if (!user) return next(new ErrorResponse('Invalid credentials', 401));

      const isMatch = await user.matchPasswords(password);

      if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401));

      console.log(req.body);
      sendToken(user, 200, res);
    } catch (err) {
      next(err);
    }
  },
};

const verifyToken = (user, token, statusCode, res) => {
  const message = user.verifyToken(token);
  res.status(statusCode).json({ success: true, message });
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  const { _id } = user;
  res.status(statusCode).json({ success: true, token, _id });
};
