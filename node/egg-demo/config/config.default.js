/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    sequelize: {
      dialect: "mysql",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: "111111",
      database: "shop"
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1561293559003_6540';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
