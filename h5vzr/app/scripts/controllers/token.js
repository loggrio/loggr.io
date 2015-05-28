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

    this.generateToken = function () {
      /*
       * add logic
       */
      console.log('token generated!');
    };

    this.cancel = function () {
      $mdDialog.cancel();
    };
  });
