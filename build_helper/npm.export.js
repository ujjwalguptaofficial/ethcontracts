if (process.env.NODE_ENV === 'production') {
    module.exports = require('./ethcontracts.node.min.js');
}
else {
    module.exports = require('./ethcontracts.node.js');
}
