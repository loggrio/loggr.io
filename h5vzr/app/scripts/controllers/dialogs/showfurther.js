'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:ShowFurtherCtrl
 * @description
 * # ShowfurtherCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('ShowFurtherCtrl', function ($mdDialog) {

    this.cancel = function () {
      $mdDialog.cancel();
    };

    this.showDialog = function (ev, dialog) {
      $mdDialog.show({
        controller: 'ShowFurtherCtrl',
        controllerAs: 'showFurther',
        templateUrl: 'views/dialogs/' + dialog + '.html',
        targetEvent: ev
      });
    };
  });
