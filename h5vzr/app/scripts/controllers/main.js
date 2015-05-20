'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('MainCtrl', function (Metering, notify, util) {

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
      notify.checkConnection(self.chartConfig.series[0]);
    });

  });
