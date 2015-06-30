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

    this.zoomNavigation = zoom.getZoomNavigation(this.charts);
    this.contextMenu = chartMenu.contextMenu(this.charts);

    this.toggleChartView = function (chartIndex) {
      self.charts[chartIndex].viewToggle();
    };

    // THIS FIX IS DEDICATED TO MARKO G.
    if (!Customer.isAuthenticated()) {
      $location.path('/login');
    } else {
      $rootScope.user = Customer.getCurrent();
      chartHandler.goLive();
    }

  });
