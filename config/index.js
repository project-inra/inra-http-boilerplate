// Compile code on the fly so we can use EcmaScript syntax with Sequelize CLI:
// https://github.com/sequelize/cli/issues/112
require("babel-register");

// Export database configuration for the current env. Used only for Sequelize
// migrations:
module.exports = require("config").get("database");
