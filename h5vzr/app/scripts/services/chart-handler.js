'use strict';

/**
* @ngdoc service
* @name loggrioApp.chartHandler
* @description
* # chartHandler
* Service in the loggrioApp.
*/
angular.module('loggrioApp')
.service('chartHandler', function ($interval, Customer, Metering, notify, util, ChartConfig) {
  this.sensors = [];
  this.chartConfig = [];
  this.chartConfig.push(new ChartConfig('Temperatur Wohnzimmer', 'Temperatur (°C)', '°C', 'Temperatur'));
  this.chartConfig.push(new ChartConfig('Luftfeuchtigkeit Wohnzimmer', 'Prozent (%)', '%', 'Luftfeuchtigkeit'));

  this.flipChart = {};

  this.customer = Customer.getCurrent();
  var self = this;
  this.goLive = function(){
    // Customer.sensors({id: Customer.getCurrentId()}).$promise.then(function (sensors) {
    //   angular.forEach(sensors, function(sensor){
    //     self.sensors.push(sensor);
    //     console.log(sensor);
    //   });
    // });
    Metering.find().$promise.then(function (meterings) {
    //Customer.meterings({id: Customer.getCurrentId(), filter: {where: {sensorId: }}}).$promise.then(function (meterings) {
      // var customer = Customer.getCurrent();
      console.log(Customer.getCurrentId());
      var chart = self.chartConfig[0].getHighcharts();
      var data = util.meteringToChartData(meterings);

      chart.series[0].setData(data, true);

      var lastTime = meterings.length ? meterings[meterings.length - 1].time : 0;
      var shift;

      // var avg = 0;
      // angular.forEach(chart.series[0].data, function (point) {
      //   avg += point.y;
      // });
      // avg = avg / chart.series[0].data.length;

      // self.flipChart.dataMax = chart.series[0].dataMax;
      // self.flipChart.dataMin = chart.series[0].dataMin;
      // self.flipChart.dataAvg = avg;

      $interval(function () {
        // shift on more than 5 dots
        shift = chart.series[0].data.length > 5;

        Metering.find().$promise.then(function (meterings) {
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

  };
});
