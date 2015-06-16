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
      $mdToast.show(
        $mdToast.simple()
          .content('Verbindung zur Messeinheit wiederhergestellt')
          .position('bottom left')
          .hideDelay(3000)
      );
    };

    var toastDisconnected = function () {
      $mdToast.show(
        $mdToast.simple()
          .content('Verbindung zur Messeinheit unterbrochen')
          .position('bottom left')
          .hideDelay(0)
      );
    };

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
                  ' <md-icon style="color: white">settings_ethernet</md-icon>' +
                  ' <span flex>  Pairing erfolgreich</span>' +
                  '</md-toast>',
        position: 'bottom left',
        hideDelay: 0,
      });
    };
  });
