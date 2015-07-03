'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:PairingCtrl
 * @description
 * # PairingCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('PairingCtrl', function ($mdDialog, $http, notify, Customer) {

    this.raspiAddress='';
    var self = this;

    this.startPairing = function () {
      // Get new accesstoken from api, already bound to current customer
      Customer.accessTokens.create(
        {id: Customer.getCurrentId()},
        {ttl: 31536000}
      ).$promise.then(function (data) {
        var requestURL = 'http://' + self.raspiAddress + ':5000';
        var payload = {
          token: data.id,
          userid: data.userId
        };

        // Post token + userId to raspberries configserver
        $http.post(requestURL, payload)
          .success(function (data) {
            if (data.status === 'ok') {
              notify.toastPaired();
            } else { // Pairing failed because of format error in token/id, missing arguments
              notify.toastPairingFailed();
            }
          })
          .error(function () { // Configserver unavailable, request timed out
            notify.toastPairingTimeOut();
          });
      });

      $mdDialog.hide();
    };

    this.cancel = function () {
      $mdDialog.cancel();
    };

  });
