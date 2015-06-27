'use strict';

/**
* @ngdoc service
* @name loggrioApp.chartHandler
* @description
* # chartHandler
* Service in the loggrioApp.
*/
angular.module('loggrioApp')
.service('chartHandler', function ($interval, $timeout, Customer, Metering, notify, util, zoom, chartConfig) {
  var self = this;

  this.charts = [];
  this.chartConfigs = [];
  this.averageChartConfigs = [];
  this.sensors = [];
  this.sensorsInUse = [];
  this.promises = [];

  // deletes items of the arrays and stops all running intervals
  this.initialize = function() {
    self.stopReload();
    self.customerId = Customer.getCurrentId();
    self.charts.splice(0,self.charts.length);
    self.chartConfigs.splice(0,self.chartConfigs.length);
    self.averageChartConfigs.splice(0,self.averageChartConfigs.length);
    self.sensors.splice(0,self.sensors.length);
    self.sensorsInUse.splice(0,self.sensorsInUse.length);
  };

  this.stopReload = function (){
    for (var id in self.promises) {
      $interval.cancel(self.promises[id]);
    }
  };

  this.goLive = function() {
    self.initialize();
    // get all sensors from the current customer
    return Customer.sensors({id: self.customerId}).$promise.then(function (sensors) {
      // generate list of all available sensors for the sortable list
      angular.forEach(sensors, function(sensor, index){
        self.sensors.push(sensor);
        // check if sensor is in use in put in the right order
        var position = util.sensorIsInUse(sensor);
        if(position > -1){ // in sensorInUse list
          self.sensorsInUse[position] = sensor;
        } else if (position === -2){ // viewConfig non existing
          self.sensorsInUse[index] = sensor;
        }
      });

      // go through all sensors in use to generate acording charts
      angular.forEach(self.sensorsInUse, function(sensor, index) {
        self.charts[index] = {
          default: chartConfig.getSplineChartConfig(sensor),
          average: chartConfig.getColumnChartConfig(sensor),
          viewToggled: false,
          viewToggle: function () {
            this.viewToggled = !this.viewToggled;
          }
        };
        // get metering to acording sensor
        Customer.meterings({id: self.customerId, filter: {where: {sensorId: sensor.id}}})
          .$promise.then(function (meterings) {
            var chart = self.charts[index].default.getHighcharts();
            var averageChart = self.charts[index].average.getHighcharts();
            var data = util.meteringToChartData(meterings).default;
            var averageData = util.meteringToChartData(meterings).averageWeek;
            chart.series[0].setData(data, true);
            averageChart.series[0].setData(averageData, true);

            var lastTime = meterings.length ? meterings[meterings.length - 1].time : 0;
            var shift;
            // live reload
            self.promises[sensor.id] = $interval(function () {
              // shift on more than 5 dots
              shift = chart.series[0].data.length > 5;
              Customer.meterings({id: self.customerId, filter: {where: {time: {gt: lastTime}, sensorId: sensor.id}}})
                .$promise.then(function (meterings) {
                  if (meterings.length) {
                    lastTime = meterings[meterings.length - 1].time;

                    var data = util.meteringToChartData(meterings).default;
                    angular.forEach(data, function (value) {
                      if(shift){
                        zoom.shift(chart, value[0]);
                      }
                      $timeout(chart.series[0].addPoint(value, true, false), 1000);
                    });
                  }
                });
            }, 10000);
          });
      });
    });
  };
});
