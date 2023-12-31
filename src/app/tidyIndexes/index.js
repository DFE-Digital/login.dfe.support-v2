const logger = require('../../infrastructure/logger');
const users = require('../../infrastructure/users');
const userDevices = require('../../infrastructure/userDevices');
const accessRequest = require('../../infrastructure/accessRequests');

const tidyIndexes = async () => {
  logger.info('Starting to tidy indexes');

  // Users
  logger.info('Deleting unused user indexes');
  await users.deleteUnusedIndexes();

  logger.info('Deleting unused userDevice indexes');
  await userDevices.deleteUnusedIndexes();

  logger.info('Deleting unused accessRequest indexes');
  await accessRequest.deleteUnusedIndexes();

  logger.info('Finished tidying indexes');
};

module.exports = {
  tidyIndexes,
};
