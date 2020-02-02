
const ServiceError = require('./ServiceError');
const AuthHelper = require('./AuthHelper');

const authCheck = function(req, res, next) {
  try {
    if (!req.query.token && !req.headers['x-auth'])
      throw new Error("You are not authorized");

    const token = req.query.token || req.headers['x-auth'];

    const data = AuthHelper.verifyToken(token);
    req.authData = data;
  
    next();
  } catch (e) {
    throw new ServiceError(403, "You are not authorized!");
  }

}

module.exports = authCheck;