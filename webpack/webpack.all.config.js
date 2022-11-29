const nodeConfig = require("./webpack.node.config");
const webConfig = require("./webpack.web.config");
const webUmdConfig = require("./webpack.umd.config");

exports.default = [webConfig, nodeConfig, webUmdConfig]