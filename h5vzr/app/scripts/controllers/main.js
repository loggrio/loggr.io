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
        lang: {
          downloadJPEG: 'Graph als JPEG exportieren',
          downloadPDF: 'Graph als PDF exportieren',
          downloadPNG: 'Graph als PNG exportieren',
          downloadSVG: 'Graph als SVG exportieren',
          loading: 'Daten werden geladen...',
          months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
          noData: 'Keine Daten zum Anzeigen vorhanden',
          printChart: 'Graph drucken',
          shortMonths: ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
          weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
        },
        title: {
          text: 'Temperatur Wohnzimmer'
        },
        chart: {
          type: 'line'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Temperatur (°C)'
          }
        },
        tooltip: {
          valueSuffix: '°C'
        }
      },
      series: [{
        data: [],
        color: '#009688',
        name: 'Temperatur'
      }]
    };

    this.flipChart = {};

    var self = this;

    Metering.find().$promise.then(function (meterings) {
      var chart = self.chartConfig.getHighcharts();
      var data = util.meteringToChartData(meterings);

      chart.series[0].setData(data, true);

      var lastTime = meterings.length ? meterings[meterings.length - 1].time : 0;
      var shift;

      var avg = 0;
      angular.forEach(chart.series[0].data, function (point) {
        avg += point.y;
      });
      avg = avg / chart.series[0].data.length;

      self.flipChart.dataMax = chart.series[0].dataMax;
      self.flipChart.dataMin = chart.series[0].dataMin;
      self.flipChart.dataAvg = avg;

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
