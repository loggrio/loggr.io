'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:CommonDialogCtrl
 * @description
 * # CommonDialogCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('CommonCtrl', function ($mdDialog) {

    this.hide = function () {
      $mdDialog.hide();
    };

  });
