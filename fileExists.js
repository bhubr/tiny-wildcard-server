const fs = require('fs');
const { promisify } = require('util');

const statAsync = promisify(fs.stat);

const fileExists = filePath => statAsync(filePath)
  .then(() => true)
  .catch(err => {
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  });

module.exports = fileExists;

