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

    this.cancel = function () {
      $mdDialog.cancel();
    };

    this.startPairing = function () {
      Customer.accessTokens.create(
        {id: Customer.getCurrentId()},
        {ttl: 120960}
      ).$promise.then(function (data) {

        var requestURL = 'http://' + self.raspiAddress + ':5000';
        var payload = {
          token: data.id,
          userid: data.userId
        };

        $http.post(requestURL, payload)
          .success(function (data) {
            if (data.status === 'ok') {
              notify.toastPaired();
            } else {
              notify.toastPairingFailed();
            }
          })
          .error(function () {
            notify.toastPairingTimeOut();
          });
      });

      $mdDialog.hide();
    };

  });
