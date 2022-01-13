const _ = require("lodash");
const bunyan = require("bunyan");
const config = require("./config.json");

const defaultConfig = config.development;
const environment = process.env.NODE_ENV || "development";
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);
finalConfig.LOG_LEVEL = (process.env.LOG_LEVEL || finalConfig.LOG_LEVEL).toLowerCase();
if( environment == "production" ) {
    var log = bunyan.createLogger({ name: "conducktor", level: finalConfig.LOG_LEVEL, localtime: new Date().toISOString() });
} else {
    var log = bunyan.createLogger({ name: "conducktor", level: finalConfig.LOG_LEVEL});
}

finalConfig.LOG_LEVEL = process.env.LOG_LEVEL || finalConfig.LOG_LEVEL;

log.info("Timezone", Intl.DateTimeFormat().resolvedOptions().timeZone);

global.gConfig = finalConfig;

module.exports = { log };