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

    var raspiConnected = true;
    var memorized = false;
    var endValue, nowValue;

    this.check = function(chartSeries) {

      $interval(function(){
        endValue = chartSeries.data[chartSeries.data.length-1][0];
        nowValue = Date.now()+7200000;
        // check if last measure point is older than 60 seconds
        if ((nowValue - endValue) > 60000) {
          raspiConnected = false;
          if(!memorized) showAlert();
        } else {
          raspiConnected = true;
          if(!memorized) showToast();
        }
        },5000);
    };

    var showToast = function () {
      memorized = true;
      $mdToast.show(
        $mdToast.simple()
          .content('Verbindung zur Messeinheit wiederhergestellt')
          .position('bottom left')
          .hideDelay(3000)
      );
    };

    var showAlert = function () {
      memorized = true;
      $mdToast.show(
        $mdToast.simple()
          .content('Verbindung zur Messeinheit unterbrochen')
          .position('bottom left')
          .hideDelay(0)
      );
    };
  });
