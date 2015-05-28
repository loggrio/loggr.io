'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:ShowFurtherCtrl
 * @description
 * # ToolbarCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('ToolbarCtrl', function ($mdDialog) {

    this.cancel = function () {
      $mdDialog.cancel();
    };

    this.showDialog = function (ev, dialog) {
      $mdDialog.show({
        controller: 'ToolbarCtrl',
        controllerAs: 'toolbar',
        templateUrl: 'views/dialogs/' + dialog + '.html',
        targetEvent: ev
      });
    };
  });
