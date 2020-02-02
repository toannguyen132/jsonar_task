const jwt = require('jsonwebtoken');

const SECRET = 'VZEDnbNnYySc3f72fgwr2Gswpck9Av'

const generateToken = function(payload) {
  return jwt.sign(payload, SECRET);
}

const verifyToken = function(token) {
  return jwt.verify(token, SECRET);
}

module.exports = {
  generateToken,
  verifyToken
}