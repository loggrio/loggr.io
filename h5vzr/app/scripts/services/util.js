'use strict';

/**
 * @ngdoc service
 * @name loggrioApp.util
 * @description
 * # util
 * Service in the loggrioApp.
 */
angular.module('loggrioApp')
  .service('util', function () {

    this.meteringToChartData = function (meterings) {
      var data = [];

      angular.forEach(meterings, function(metering) {
        this.push([Date.parse(metering.time), metering.value]);
      }, data);

      return data;
    };

    this.sensorIsInUse = function(sensor){
      var position = -1; //not in Use
      var viewConfig = JSON.parse(localStorage.getItem('viewConfig'));
      if(viewConfig){
        angular.forEach(viewConfig.sensorsInUse, function(sensorInUse, index){
          if(sensor.id === sensorInUse.id){
            position = index;
          }
        });
      } else { //viewConfig non existing
        position = -2;
      }
      return position;
    };

  });
