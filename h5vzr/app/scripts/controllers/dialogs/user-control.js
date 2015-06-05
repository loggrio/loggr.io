'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:UserControlCtrl
 * @description
 * # UserControlCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('UserControlCtrl', function ($mdDialog) {

    // TODO: bind to form
    var payload = {};

    this.cancel = function () {
      $mdDialog.cancel();
    };

    this.submit = function () {
      $mdDialog.hide(payload);
    };

  });
