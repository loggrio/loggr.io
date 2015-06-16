'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:TokenCtrl
 * @description
 * # TokenCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('TokenCtrl', function ($mdDialog, $http, notify) {

    this.raspiAdress='';

    this.cancel = function () {
      $mdDialog.cancel();
    };

    this.startPairing = function () {

      var requestURL = 'http://' + this.raspiAdress + ':5000';

      var payload = {
        token: localStorage.getItem('$LoopBack$accessTokenId'),
        userid: localStorage.getItem('$LoopBack$currentUserId')
      };

      console.log(payload);
      $http.post(requestURL, payload);
      $mdDialog.hide();
      // TODO show response toasts
      // notify.toastPaired();

    };

  });
