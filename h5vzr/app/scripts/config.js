'use strict';

/**
 * Config of the application.
 */
angular
  .module('loggrioApp')
    .constant('API', 'http://localhost:3000/api')
    .constant('POLLING_INTERVAL', 10000);
