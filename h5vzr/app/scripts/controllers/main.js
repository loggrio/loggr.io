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

    var self = this;

    this.charts = chartHandler.charts;
    this.ranges = zoom.ranges;

    this.toggleChartView = function (chartIndex) {
      self.charts[chartIndex].viewToggle();
    };

    this.selectRange = function(chartIndex, range){
      zoom.selectRange(this.charts[chartIndex].default.getHighcharts(), range);
    };

    this.resetZoom = function(chartIndex){
      zoom.resetZoom(this.charts[chartIndex].default.getHighcharts());
    };

    this.zoomIn = function(chartIndex){
      zoom.zoomIn(this.charts[chartIndex].default.getHighcharts());
    };

    this.zoomOut = function(chartIndex){
      zoom.zoomOut(this.charts[chartIndex].default.getHighcharts());
    };

    this.navigateLeft = function(chartIndex){
      zoom.navigateLeft(this.charts[chartIndex].default.getHighcharts());
    };

    this.navigateRight = function(chartIndex){
      zoom.navigateRight(this.charts[chartIndex].default.getHighcharts());
    };

    // THIS FIX IS DEDICATED TO MARKO G.
    if (!Customer.isAuthenticated()) {
      $location.path('/login');
    } else {
      $rootScope.user = Customer.getCurrent();
      chartHandler.goLive();
    }

  });
