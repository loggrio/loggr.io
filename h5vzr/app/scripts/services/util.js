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
      var data = {
        default: [],
        averageWeek: []
      };
      var days = [];
      var oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      angular.forEach(meterings, function(metering) {
        var date = new Date(metering.time);
        var dayIndex = date.getDay();
        var value = metering.value;
        // push all data in default dataMax
        data.default.push([Date.parse(metering.time), value]);
        // sum values of the same day in the last week
        if(date >= oneWeekAgo){
          if(!days[dayIndex]){
            days[dayIndex] = {
              count: 0,
              value: 0
            };
          }
          days[dayIndex].count++;
          days[dayIndex].value += value;
        }
      });

      for(var dayIndex in days) {
        data.averageWeek.push([dayIndex, days[dayIndex].value / days[dayIndex].count]);
      }

      return data;
    };

    this.sensorIsInUse = function(sensor) {
      var position = -1; // not in Use
      var viewConfig = JSON.parse(localStorage.getItem('viewConfig'));
      if(viewConfig){
        angular.forEach(viewConfig.sensorsInUse, function(sensorInUse, index){
          if(sensor.id === sensorInUse.id){
            position = index;
          }
        });
      } else { // viewConfig non existing
        position = -2;
      }
      return position;
    };

  });
