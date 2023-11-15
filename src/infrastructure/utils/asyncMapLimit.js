const mapLimit = require('async/mapLimit');

const asyncMapLimit = async (coll, iteratee, concurrency = 5) => new Promise((resolve, reject) => {
  mapLimit(coll, concurrency, iteratee, (err, mapped) => {
    if (err) {
      reject(err);
    } else {
      resolve(mapped);
    }
  });
});

module.exports = asyncMapLimit;
