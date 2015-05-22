'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:ConfigureViewCtrl
 * @description
 * # ConfigureViewCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('ConfigureViewCtrl', function ($mdDialog) {

    this.hide = function () {
      $mdDialog.hide();
    };

    this.cancel = function () {
      $mdDialog.cancel();
    };

    this.answer = function (answer) {
      $mdDialog.hide(answer);
    };

  });
