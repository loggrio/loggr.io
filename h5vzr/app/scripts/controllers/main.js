'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('MainCtrl', function ($q, Metering, notify, util) {

    this.chartConfig = {
      options: {
        chart: {
          type: 'line'
        },
        xAxis: {
          type: 'datetime'
        }
      },
      series: []
    };

    var self = this;

    var chartPromise = Metering.find().$promise.then(function (meterings) {
      var serie = util.meteringToChartSerie(meterings);
      self.chartConfig.series.push(serie);
    });

    chartPromise.then(function() {
        notify.check(self.chartConfig.series[0]);
      });

  });
