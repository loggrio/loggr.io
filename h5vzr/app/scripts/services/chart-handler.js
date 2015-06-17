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
  this.chartConfig = [];
  this.flipChart = {};
  this.customerId = Customer.getCurrentId();
  this.sensors = [];
  this.promise = [];
  var self = this;

  this.goLive = function(){
    Customer.sensors({id: self.customerId}).$promise.then(function (sensors) {
      angular.forEach(sensors, function(sensor, index){
        self.sensors.push(sensor);
        //if(util.sensorIsInUse(sensor)){
          self.chartConfig[index] = new ChartConfig(sensor);
          Customer.meterings({id: self.customerId, filter: {where: {sensorId: sensor.id}}}).$promise.then(function (meterings) {
            var chart = self.chartConfig[index].getHighcharts();
            var data = util.meteringToChartData(meterings);

            chart.series[0].setData(data, true);

            var lastTime = meterings.length ? meterings[meterings.length - 1].time : 0;
            var shift;

            self.promise[sensor.id] = $interval(function () {
              // shift on more than 5 dots
              shift = chart.series[0].data.length > 5;
              Customer.meterings({id: self.customerId, filter: {where: {sensorId: sensor.id}}}).$promise.then(function (meterings) {
                if (meterings.length) {
                  lastTime = meterings[meterings.length - 1].time;

                  var data = util.meteringToChartData(meterings);

                  angular.forEach(data, function (value) {
                    chart.series[0].addPoint(value, true, shift);
                  });
                }
              });
            }, 10000);
          });
        //}
      });
      console.log(self.chartConfig);
      self.sort();

    });
  };

  this.sort = function(){
    var viewConfig = JSON.parse(localStorage.getItem('viewConfig'));
    console.log(viewConfig);
    if(viewConfig!==null){
      var tmpChartConfig = [];
      angular.forEach(viewConfig.sensorsInUse, function(sensor){
        angular.forEach(self.chartConfig, function(chartConfig){
          if(chartConfig.id === sensor.id){
            tmpChartConfig.push(chartConfig);
          }
        });
      });
      self.chartConfig.splice(0,self.chartConfig.length);
      angular.forEach(tmpChartConfig, function(chartConfig){
        self.chartConfig.push(chartConfig);
      });
    }
  };
});
