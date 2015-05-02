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

    this.meteringToChartSerie = function (meterings) {
      var serie = {data: []};

      angular.forEach(meterings, function(metering) {
        this.data.push([Date.parse(metering.time), metering.value]);
      }, serie);

      return serie;
    };

  });
