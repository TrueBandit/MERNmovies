const crypto = require('crypto');

module.exports = {
  privateKey: crypto.randomBytes(32).toString('hex')
};