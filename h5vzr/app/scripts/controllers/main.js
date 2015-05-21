'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('MainCtrl', function ($interval, Metering, notify, util) {

    this.chartConfig = {
      options: {
        chart: {
          type: 'line'
        },
        xAxis: {
          type: 'datetime'
        }
      },
      series: [{data: []}]
    };

    var self = this;

    Metering.find().$promise.then(function (meterings) {
      var chart = self.chartConfig.getHighcharts();
      var data = util.meteringToChartData(meterings);

      chart.series[0].setData(data,true);

      var lastTime = meterings.length ? meterings[meterings.length - 1].time : 0;
      var shift;

      $interval(function () {
        // shift on more than 5 dots
        shift = chart.series[0].data.length > 5;

        Metering.find({filter: {where: {time: {gt: lastTime}}}}).$promise.then(function (meterings) {
          if (meterings.length) {
            lastTime = meterings[meterings.length - 1].time;

            var data = util.meteringToChartData(meterings);

            angular.forEach(data, function (value) {
              chart.series[0].addPoint(value, true, shift);
            });
          }
        });
      }, 10000);

      // TODO: combine with live data
      notify.checkConnection(chart.series[0]);
    });

  });
