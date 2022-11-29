if (process.env.NODE_ENV === 'production') {
    module.exports = require('./ethcontracts.umd.min.js');
}
else {
    module.exports = require('./ethcontracts.umd.js');
}
