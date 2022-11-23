if (process.env.NODE_ENV === 'production') {
    module.exports = require('./ethcontracts.commonjs2.min.js');
}
else {
    module.exports = require('./ethcontracts.commonjs2.js');
}
