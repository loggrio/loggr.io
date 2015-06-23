'use strict';

/**
 * @ngdoc service
 * @name loggrioApp.notify
 * @description
 * # notify
 * Service in the loggrioApp.
 */
angular.module('loggrioApp')
  .service('notify', function ($interval, $mdToast) {

    var lastTime, nowTime;
    var delay = 120000;
    var toggled = false;

    var toastReconnected = function () {
      $mdToast.show({
        template: '<md-toast>' +
                  ' <md-icon style="color:white">check</md-icon>' +
                  ' <span flex>Verbindung zur Messeinheit wiederhergestellt</span>' +
                  '</md-toast>',
        hideDelay: 3000,
        position: 'bottom left'
      });
    };

    var toastDisconnected = function () {
      $mdToast.show({
        template: '<md-toast>' +
                  ' <md-icon style="color:white">flash_on</md-icon>' +
                  ' <span flex>Verbindung zur Messeinheit unterbrochen</span>' +
                  '</md-toast>',
        hideDelay: 0,
        position: 'bottom left'
      });
    };
    // $mdToast.simple()
    //   .content('Verbindung zur Messeinheit unterbrochen')
    //   .position('bottom left')
    //   .hideDelay(0)
    // invert toggled
    var toggle = function () {
      toggled = !toggled;
    };

    this.checkConnection = function(serie) {
      // check if last metering point is older than delay
      var isDisconnected = function () {
        lastTime = serie.data[serie.data.length - 1].x;
        nowTime = Date.now();

        return (nowTime - lastTime) > delay;
      };

      // initial check
      if (!toggled && isDisconnected()) {
        toggle();
        toastDisconnected();
      }

      // rechecheck every 30s
      $interval(function() {
        if (!toggled && isDisconnected()) {
          toggle();
          toastDisconnected();
        } else if (toggled && !isDisconnected()) {
          toggle();
          toastReconnected();
        }
      }, 30000);
    };

    this.toastPaired = function () {
      $mdToast.show({
        template: '<md-toast>' +
                  ' <md-icon style="color: white">done</md-icon>' +
                  ' <span flex>  Pairing erfolgreich</span>' +
                  '</md-toast>',
        position: 'bottom left',
        hideDelay: 3000,
      });
    };

    this.toastPairingFailed = function () {
      $mdToast.show({
        template: '<md-toast>' +
                  ' <md-icon style="color: white">flash_on</md-icon>' +
                  ' <span flex>  Fehler fehlgeschlagen</span>' +
                  '</md-toast>',
        position: 'bottom left',
        hideDelay: 3000,
      });
    };

    this.toastPairingTimeOut = function () {
      $mdToast.show({
        template: '<md-toast>' +
                  ' <md-icon style="color: white">flash_on</md-icon>' +
                  ' <span flex>  Raspberry nicht verfügbar</span>' +
                  '</md-toast>',
        position: 'bottom left',
        hideDelay: 3000,
      });
    };
  });
