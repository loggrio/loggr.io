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
      console.log('clicked!')
      $mdDialog.show({
        controller: 'ConfigureViewCtrl',
        templateUrl: 'views/dialogs/configure-view.html',
        targetEvent: ev
      });
    };

  });
