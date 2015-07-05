'use strict';

/**
 * @ngdoc service
 * @name loggrioApp.chartHandler
 * @description
 * # chartHandler
 * Service in the loggrioApp.
 */
angular.module('loggrioApp')
  .service('chartHandler', function ($interval, $timeout, Customer, notify, util, zoom, chartConfig, POLLING_INTERVAL) {

    var self = this;

    this.charts = [];
    this.chartConfigs = [];
    this.averageChartConfigs = [];
    this.sensors = [];
    this.sensorsInUse = [];
    this.promises = [];

    // disconnectToast toggled
    var toggled = false;

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
              // get highcharts objects
              var chart = self.charts[index].default.getHighcharts();
              var averageChart = self.charts[index].average.getHighcharts();

              // transform data
              var data = util.meteringToChartData(meterings);
              var defaultData = data.default;
              var averageData = data.averageWeek.values;
              var averageCategories = data.averageWeek.categories;

              // set data
              chart.series[0].setData(defaultData, true);
              averageChart.series[0].setData(averageData, true);
              averageChart.xAxis[0].setCategories(averageCategories, true);
              util.setAverageExtremes(averageChart);

              self.charts[index].default.loading = false;

              // live reload
              var lastTime = meterings.length ? meterings[meterings.length - 1].time : 0;
              var shift;
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

                    // check if disconnected
                    if (!toggled && util.isDisconnected(lastTime)) {
                      toggled = true;
                      notify.toastDisconnected();
                    } else if (toggled && !util.isDisconnected(lastTime)) {
                      toggled = false;
                      notify.toastReconnected();
                    }

                  });
              }, POLLING_INTERVAL);
            });
        });
      });
    };

  });
