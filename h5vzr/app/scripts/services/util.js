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

    function getWeekDay(weekDay) {
      switch (weekDay) {
          case '0':
            return 'Sonntag';
          case '1':
            return 'Montag';
          case '2':
            return 'Dienstag';
          case '3':
            return 'Mittwoch';
          case '4':
            return 'Donnerstag';
          case '5':
            return 'Freitag';
          case '6':
            return 'Samstag';
          default:
            return 'Falscher Tag';
      }
    }

    this.meteringToChartData = function (meterings) {
      var data = {
        default: [],
        averageWeek: {
          values: [],
          categories: []
        }
      };

      var days = [];
      var oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      angular.forEach(meterings, function(metering) {
        var date = Date.parse(metering.time);
        var value = metering.value;

        // push data to default chart
        data.default.push([date, value]);

        // sum values of the same day in the last week
        var dayIndex = new Date(date).getDay();
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
        data.averageWeek.values.push(Math.round((days[dayIndex].value / days[dayIndex].count) * 100) / 100);
        data.averageWeek.categories.push(getWeekDay(dayIndex));
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

    this.isDisconnected = function (lastTime) {
      // TODO: move to config file
      var delay = 120000;
      var nowTime = Date.now();

      return (nowTime - Date.parse(lastTime)) > delay;
    };

  });
