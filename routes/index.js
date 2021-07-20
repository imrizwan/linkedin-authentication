const express = require('express');
const apiRouter = express.Router();
const auth = require('./auth');
const testing = require('./testing');

// Add routes
apiRouter.use('/auth', auth);
apiRouter.use('/testing', testing);
module.exports = apiRouter;

