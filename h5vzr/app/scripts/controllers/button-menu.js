'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:ButtonMenuCtrl
 * @description
 * # ButtonMenuCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('ButtonMenuCtrl', function ($mdDialog) {


    this.tokenDialog = function (ev) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'TokenCtrl',
        controllerAs: 'token',
        templateUrl: 'views/dialogs/token.html',
        targetEvent: ev
      });
    };

    this.showDialog = function (ev) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'ConfigureViewCtrl',
        controllerAs: 'configureView',
        templateUrl: 'views/dialogs/configure-view.html',
        targetEvent: ev
      });
    };

  });
