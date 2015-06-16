'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('MainCtrl', function ($location, $interval, Customer, chartHandler) {

    if (!Customer.isAuthenticated()) {
      $location.path('/login');
      return;
    }

    this.chartConfig = [];
    this.chartConfig = chartHandler.chartConfig;
    this.flipChart = chartHandler.flipChart;
    chartHandler.goLive();
  });
