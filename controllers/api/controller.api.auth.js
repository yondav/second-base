const { User } = require('../../models');
const ErrorResponse = require('../../utils/errorResponse');
const crypto = require('crypto');

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
    console.log('TOKEN***\n', token);

    if (!token) return next(new ErrorResponse('No token', 400));

    try {
      const user = await User.findOne({ email: 'secondbase.space@gmail.com' });

      if (!user) return next(new ErrorResponse('Not a valid user', 400));

      const verifyToken = () => {
        const message = user.verifyToken(token);
        if (message.id === user._id.toString().split('"')[0]) {
          return res.status(200).json({ success: true, message });
        } else {
          return next(new ErrorResponse('Invalid token'));
        }
      };

      verifyToken();
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;
    console.log('REQ.BODY:::', req.body);

    if (!email || !password)
      return next(
        new ErrorResponse('Please provide an email and password', 400)
      );

    try {
      const user = await User.findOne({ email }).select('+password');

      if (!user) return next(new ErrorResponse('Invalid credentials', 401));

      const isMatch = await user.matchPasswords(password);

      if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401));

      sendToken(user, 200, res);
    } catch (err) {
      next(err);
    }
  },

  getResetToken: async (req, res, next) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return next(new ErrorResponse('User could not be found', 404));
      }

      const resetToken = user.getResetPasswordToken();

      await user.save();

      res.status(200).json(resetToken);
    } catch (err) {
      next(err);
    }
  },

  resetPassword: async (req, res, next) => {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        return next(new ErrorResponse('Invalid Reset Token', 400));
      }

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res
        .status(201)
        .json({ success: true, data: 'Password Reset Success' });
    } catch (err) {
      next(err);
    }
  },
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  const { _id } = user;
  res.cookie('token_secondBase', token);
  res.status(statusCode).json({ success: true, token, _id });
};
