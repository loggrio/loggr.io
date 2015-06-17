'use strict';

/**
 * @ngdoc service
 * @name loggrioApp.sortableItem
 * @description
 * # sortableItem
 * Value in the loggrioApp.
 */
angular.module('loggrioApp')
  .value('SortableItem', function(sensor){
    var item;
    switch (sensor.type) {
      case 'temperature':
        item = {
          id: sensor.id,
          icon: 'images/ic_thermometer_24dp.png',
          iconType: 'img',
          name: 'Temperatur',
          location: sensor.location
        };
        break;
      case 'humidity':
        item = {
          id: sensor.id,
          icon: 'invert_colors',
          iconType: 'font',
          name: 'Luftfeuchtigkeit',
          location: sensor.location
        };
        break;
      case 'brightness':
        item = {
          id: sensor.id,
          icon: 'wb_sunny',
          iconType: 'font',
          name: 'Helligkeit',
          location: sensor.location
        };
        break;
      case 'pressure':
        item = {
          id: sensor.id,
          icon: 'av_timer',
          iconType: 'font',
          name: 'Luftdruck',
          location: sensor.location
        };
        break;
      default:
        console.log('Unknown Sensor');
    }
    return item;
  });
