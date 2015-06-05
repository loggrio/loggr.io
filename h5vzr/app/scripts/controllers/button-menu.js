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

    this.showDialog = function (ev) {
      $mdDialog.show({
        controller: 'ConfigureViewCtrl',
        controllerAs: 'configureView',
        templateUrl: 'views/dialogs/configure-view.html',
        targetEvent: ev
      });
    };

  });
