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


    this.pairingDialog = function (ev) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'PairingCtrl',
        controllerAs: 'pairing',
        templateUrl: 'views/dialogs/pairing-dialog.html',
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
