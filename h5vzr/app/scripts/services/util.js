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
          case 0:
            return 'Sonntag';
          case 1:
            return 'Montag';
          case 2:
            return 'Dienstag';
          case 3:
            return 'Mittwoch';
          case 4:
            return 'Donnerstag';
          case 5:
            return 'Freitag';
          case 6:
            return 'Samstag';
          default:
            return 'Falscher Tag';
      }
    }

    function round(value) {
      return Math.round(value * 100) / 100;
    }

    this.meteringToChartData = function (meterings) {
      var data = {
        default: [],
        averageWeek: {
          values: [],
          categories: []
        }
      };

      var oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      oneWeekAgo = oneWeekAgo.getTime();
      var counter = 0;

      angular.forEach(meterings, function(metering) {
        var date = Date.parse(metering.time);
        var value = metering.value;

        // push data to default chart
        data.default.push([date, value]);

        // sum values of the same day in the last week
        if (date >= oneWeekAgo) {
          var day = new Date(date).getDay();
          var length = data.averageWeek.categories.length;

          // if day is not already in -> create and add first value
          if (data.averageWeek.categories[length - 1] !== getWeekDay(day)) {
            counter = 0;
            data.averageWeek.categories.push(getWeekDay(day));
            data.averageWeek.values.push(value);
          // else sum up average
          } else {
            counter += 1;
            var lastValue = data.averageWeek.values[length - 1];
            data.averageWeek.values[length - 1] = round((lastValue * counter + value) / (counter + 1));
          }
        }
      });

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
