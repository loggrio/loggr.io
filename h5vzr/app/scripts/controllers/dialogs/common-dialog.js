'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:CommonDialogCtrl
 * @description
 * # CommonDialogCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('CommonDialogCtrl', function ($mdDialog) {

    this.hide = function () {
      $mdDialog.hide();
    };

  });
