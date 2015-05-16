'use strict';

/**
 * @ngdoc service
 * @name loggrioApp.util
 * @description
 * # util
 * Service in the loggrioApp.
 */
angular.module('loggrioApp')
  .service('util', function () {

    this.meteringToChartData = function (meterings) {
      var data = [];

      angular.forEach(meterings, function(metering) {
        this.push([Date.parse(metering.time), metering.value]);
      }, data);

      return data;
    };

  });
