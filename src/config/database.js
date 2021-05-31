/**
 * Connect to database
 */
const mongoose = require('mongoose');
const { logger } = require('./logger');

module.exports = async () => {
  const options = {
    dbName: process.env.MONGODB_DATABASE,
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (options.user === '') delete options.user;
  if (options.pass === '') delete options.pass;

  await mongoose.connect(process.env.MONGODB_URL, options);
  logger.info('connected to MongoDB...');
};
