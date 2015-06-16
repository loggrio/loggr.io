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
        "token": localStorage.getItem('$LoopBack$accessTokenId'),
        "userid": localStorage.getItem('$LoopBack$currentUserId')
      };

      $http.post(requestURL, payload).success(function (data) {
        console.log(data.status);
        if (data.status === 'ok') {
          notify.toastPaired();
        } else {
          notify.toastPairingfailed();
        }
      });
      $mdDialog.hide();
    };

  });
