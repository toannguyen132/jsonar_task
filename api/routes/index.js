const express = require('express');
const router = express.Router();
const authRoute = require('./auth');
const customerRoute = require('./customer');
const authMiddleware = require('../utils/authMiddleware');

router.use('/', authRoute);
router.use(authMiddleware).use('/customers', customerRoute);

module.exports = router;