'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:ConfigureViewCtrl
 * @description
 * # ConfigureViewCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('ConfigureViewCtrl', function ($mdDialog) {
    var self = this;

    this.sensors = [
      {
        id: 0,
        icon: 'images/ic_thermometer_24dp.png',
        iconType: 'img',
        name:'Temperatur'
      },
      {
        id: 1,
        icon: 'invert_colors',
        iconType: 'font',
        name: 'Luftfeuchtigkeit'
      },
      {
        id: 2,
        icon: 'av_timer',
        iconType: 'font',
        name:'Luftdruck'
      },
      {
        id: 3,
        icon: 'wb_sunny',
        iconType: 'font',
        name: 'Helligkeit'}
    ];

    this.sensorsInUse = [];
    this.sensorsAvailable = [];

    this.initArrays = function(){
      var viewConfig = JSON.parse(localStorage.getItem('viewConfig'));
      if(!viewConfig){
        self.sensorsAvailable = self.sensors;
      } else {
        self.sensorsAvailable = viewConfig.sensorsAvailable;
        self.sensorsInUse = viewConfig.sensorsInUse;
      }
      console.log(self.sensorsInUse);
    };

    this.inUseConfig = {
      group: { name: 'shared', pull: false, put: true },
      ghostClass: 'ghost',
      animation: 150,
    };

    this.availableConfig = {
      group: { name: 'shared', pull: true, put: false },
      sort: false,
      ghostClass: 'ghost',
      animation: 150,
    };

    this.cancel = function () {
      $mdDialog.cancel();
    };

    this.submit = function () {
      var viewConfig = {
        sensorsAvailable: self.sensorsAvailable,
        sensorsInUse: self.sensorsInUse
      };
      localStorage.setItem('viewConfig', JSON.stringify(viewConfig));
      $mdDialog.hide();
    };

    this.showDelete = false;
    this.initArrays();

  });
