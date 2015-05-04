'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('MainCtrl', function ($scope, Metering, util) {

    this.chartConfig = {
      options: {
        chart: {
          type: 'line'
        },
        xAxis: {
          type: 'datetime'
        }
      },
      series: []
    };

    var self = this;

    Metering.find().$promise.then(function (meterings) {
      var serie = util.meteringToChartSerie(meterings);
      self.chartConfig.series.push(serie);
    });

    $scope.buttons = [{
        label: 'Configure view',
        icon: 'ion-edit'
      },{
        label: 'Add chart',
        icon: 'ion-plus-round'
      }];
  });
