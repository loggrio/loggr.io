'use strict';

/**
 * @ngdoc service
 * @name loggrioApp.notify
 * @description
 * # notify
 * Service in the loggrioApp.
 */
angular.module('loggrioApp')
  .service('notify', function ($mdToast) {

    var self = this;

    var toggled = false;

    function restoreDiconnectToast() {
      if (toggled) {
        self.toastDisconnected();
      }
    }

    this.toastReconnected = function () {
      $mdToast.show({
        template: '<md-toast>' +
                  ' <md-icon style="color:white">check</md-icon>' +
                  ' <span flex>Verbindung zur Messeinheit wiederhergestellt</span>' +
                  '</md-toast>',
        hideDelay: 3000,
        position: 'bottom left'
      });
      toggled = false;
    };

    this.toastDisconnected = function () {
      $mdToast.show({
        template: '<md-toast>' +
                  ' <md-icon style="color:white">flash_on</md-icon>' +
                  ' <span flex>Verbindung zur Messeinheit unterbrochen</span>' +
                  '</md-toast>',
        hideDelay: 0,
        position: 'bottom left'
      });
      toggled = true;
    };

    this.toastPaired = function () {
      $mdToast.show({
        template: '<md-toast>' +
                  ' <md-icon style="color: white">done</md-icon>' +
                  ' <span flex>  Pairing erfolgreich</span>' +
                  '</md-toast>',
        position: 'bottom left',
        hideDelay: 3000,
      }).finally(restoreDiconnectToast);
    };

    this.toastPairingFailed = function () {
      $mdToast.show({
        template: '<md-toast>' +
                  ' <md-icon style="color: white">flash_on</md-icon>' +
                  ' <span flex>  Pairing fehlgeschlagen</span>' +
                  '</md-toast>',
        position: 'bottom left',
        hideDelay: 3000,
      }).finally(restoreDiconnectToast);
    };

    this.toastPairingTimeOut = function () {
      $mdToast.show({
        template: '<md-toast>' +
                  ' <md-icon style="color: white">flash_on</md-icon>' +
                  ' <span flex>  Raspberry nicht verfügbar</span>' +
                  '</md-toast>',
        position: 'bottom left',
        hideDelay: 3000,
      }).finally(restoreDiconnectToast);
    };

  });
