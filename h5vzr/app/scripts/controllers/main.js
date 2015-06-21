'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('MainCtrl', function ($rootScope, Customer, chartHandler, zoom) {

    $rootScope.user = Customer.getCurrent();

    this.chartConfig = [];
    this.chartConfig = chartHandler.chartConfig;
    this.flipChart = chartHandler.flipChart;
    this.ranges = zoom.ranges;

    this.selectRange = function(chartIndex, range){
      zoom.selectRange(this.chartConfig[chartIndex].getHighcharts(), range);
    };

    this.resetZoom = function(chartIndex){
      zoom.resetZoom(this.chartConfig[chartIndex].getHighcharts());
    };

    this.zoomIn = function(chartIndex){
      zoom.zoomIn(this.chartConfig[chartIndex].getHighcharts());
    };

    this.zoomOut = function(chartIndex){
      zoom.zoomOut(this.chartConfig[chartIndex].getHighcharts());
    };

    this.navigateLeft = function(chartIndex){
      zoom.navigateLeft(this.chartConfig[chartIndex].getHighcharts());
    };

    this.navigateRight = function(chartIndex){
      zoom.navigateRight(this.chartConfig[chartIndex].getHighcharts());
    };

    chartHandler.goLive();
  });
