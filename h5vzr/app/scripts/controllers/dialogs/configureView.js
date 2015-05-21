'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:ConfigureViewCtrl
 * @description
 * # ConfigureViewCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('ConfigureViewCtrl', function ($scope,$mdDialog) {
    $scope.showConfigureView = function (ev) {
      console.log('Test');
      $mdDialog.show({
        controller: dialogController,
        templateUrl: 'views/dialogs/configureView.html',
        targetEvent: ev
      });
    };

  });

function dialogController ($scope,$mdDialog){
  $scope.hide = function () {
    $mdDialog.hide();
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
  };
}
