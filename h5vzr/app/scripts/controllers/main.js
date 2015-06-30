'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('MainCtrl', function ($rootScope, $location, Customer, chartHandler, chartMenu, zoom) {

    var self = this;

    this.charts = chartHandler.charts;
    this.ranges = zoom.ranges;

    this.toggleChartView = function (chartIndex) {
      self.charts[chartIndex].viewToggle();
    };

    this.selectRange = function (chartIndex, range) {
      zoom.selectRange(self.charts[chartIndex].default.getHighcharts(), range);
    };

    this.resetZoom = function (chartIndex) {
      zoom.resetZoom(self.charts[chartIndex].default.getHighcharts());
    };

    this.zoomIn = function (chartIndex) {
      zoom.zoomIn(self.charts[chartIndex].default.getHighcharts());
    };

    this.zoomOut = function (chartIndex) {
      zoom.zoomOut(self.charts[chartIndex].default.getHighcharts());
    };

    this.navigateLeft = function (chartIndex) {
      zoom.navigateLeft(self.charts[chartIndex].default.getHighcharts());
    };

    this.navigateRight = function (chartIndex) {
      zoom.navigateRight(self.charts[chartIndex].default.getHighcharts());
    };

    this.contextMenu = chartMenu.contextMenu(this.charts);

    // THIS FIX IS DEDICATED TO MARKO G.
    if (!Customer.isAuthenticated()) {
      $location.path('/login');
    } else {
      $rootScope.user = Customer.getCurrent();
      chartHandler.goLive();
    }

  });
