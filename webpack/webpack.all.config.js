const nodeConfig = require("./webpack.node.config");
const webConfig = require("./webpack.web.config");

exports.default = [webConfig, nodeConfig]