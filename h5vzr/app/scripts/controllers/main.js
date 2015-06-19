'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('MainCtrl', function ($location, $interval, Customer, chartHandler, zoom) {

    if (!Customer.isAuthenticated()) {
      $location.path('/login');
      return;
    }

    this.chartConfig = [];
    this.chartConfig = chartHandler.chartConfig;
    this.flipChart = chartHandler.flipChart;
    this.ranges = zoom.ranges;

    this.selectRange = function(chartIndex, range){
      zoom.zoomChart(this.chartConfig[chartIndex].getHighcharts(), range);
    };

    this.resetZoom = function(chartIndex){
      zoom.resetZoom(this.chartConfig[chartIndex].getHighcharts());
      console.log('test');
    };

    chartHandler.goLive();
  });
