// @todo: in production mode, we should compile everything instead of compiling
// on the fly using a require hook:
require("babel-register");
const config = require('config');
// Run the server:
require("./src/App").default(config.get("server"),config.get("database"));
