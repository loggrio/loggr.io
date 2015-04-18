'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
