var _ = require('lodash');

var config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  logging: false,
  expireTime: "30 days",
  secrets: {
    jwt: process.env.jwt || 'brainboxsecrettext'
  },
};

//load up developement.js ||
//testing.js ||
//production.js
//config
//all which have they're own configs that may change and add values
var envConfig;
try {
  envConfig = require('./' + config.env);
} catch (error) {
  envConfig = {};
}

//merge the two objects and export it so app can use it
module.exports = _.assign(config, envConfig || {});
