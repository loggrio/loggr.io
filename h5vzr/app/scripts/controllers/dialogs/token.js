'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:TokenCtrl
 * @description
 * # TokenCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('TokenCtrl', function ($mdDialog) {

    // TODO: bind to form
    var payload = {};

    this.cancel = function () {
      $mdDialog.cancel();
    };

    this.submit = function () {
      $mdDialog.hide(payload);
    };

  });
