'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('MainCtrl', function ($rootScope, $location, Customer, chartHandler, zoom) {

    this.chartConfigs = chartHandler.chartConfigs;
    this.flipChart = chartHandler.flipChart;
    this.ranges = zoom.ranges;

    this.selectRange = function(chartIndex, range){
      zoom.selectRange(this.chartConfigs[chartIndex].getHighcharts(), range);
    };

    this.resetZoom = function(chartIndex){
      zoom.resetZoom(this.chartConfigs[chartIndex].getHighcharts());
    };

    this.zoomIn = function(chartIndex){
      zoom.zoomIn(this.chartConfigs[chartIndex].getHighcharts());
    };

    this.zoomOut = function(chartIndex){
      zoom.zoomOut(this.chartConfigs[chartIndex].getHighcharts());
    };

    this.navigateLeft = function(chartIndex){
      zoom.navigateLeft(this.chartConfigs[chartIndex].getHighcharts());
    };

    this.navigateRight = function(chartIndex){
      zoom.navigateRight(this.chartConfigs[chartIndex].getHighcharts());
    };

    // THIS FIX IS DEDICATED TO MARKO G.
    if (!Customer.isAuthenticated()) {
      $location.path('/login');
    } else {
      $rootScope.user = Customer.getCurrent();
      chartHandler.goLive();
    }

  });
