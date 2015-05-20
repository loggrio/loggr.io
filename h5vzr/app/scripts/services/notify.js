'use strict';

/**
 * @ngdoc service
 * @name loggrioApp.notify
 * @description
 * # notify
 * Service in the loggrioApp.
 */
angular.module('loggrioApp')
  .service('notify', function ($interval, Metering, $mdToast) {

    var endValue, nowValue;
    var showingAlert = false;
    var toastShown = true;

    this.check = function(chartSeries) {
      $interval(function() {
        endValue = chartSeries.data[chartSeries.data.length - 1][0];
        nowValue = Date.now() + 7200000;

        // check if last measure point is older than 60 seconds
        if ((nowValue - endValue) > 60000) {
          if(!showingAlert){
            toastConnectionLost();
          }
        } else {
          if(!toastShown){
            toastReconnect();
          }
        }
      },5000);
    };

    var toastReconnect = function () {
      $mdToast.show(
        $mdToast.simple()
          .content('Verbindung zur Messeinheit wiederhergestellt')
          .position('bottom left')
          .hideDelay(3000)
      );
      showingAlert = false;
      toastShown = true;
    };

    var toastConnectionLost = function () {
      $mdToast.show(
        $mdToast.simple()
          .content('Verbindung zur Messeinheit unterbrochen')
          .position('bottom left')
          .hideDelay(0)
      );
      showingAlert = true;
      toastShown = false;
    };
  });
