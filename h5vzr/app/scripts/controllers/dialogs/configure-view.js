'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:ConfigureViewCtrl
 * @description
 * # ConfigureViewCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('ConfigureViewCtrl', function ($mdDialog, $interval, chartHandler, SortableItem) {
    var self = this;
    var sensors = chartHandler.sensors;
    this.sensors = [];
    angular.forEach(sensors, function(sensor){
      self.sensors.push(new SortableItem(sensor));
    });

    this.sensorsInUse = [];
    this.sensorsAvailable = [];

    this.initArrays = function(){
      var viewConfig = JSON.parse(localStorage.getItem('viewConfig'));
      if(!viewConfig){
        self.sensorsInUse = self.sensors;
      } else {
        self.sensorsAvailable = viewConfig.sensorsAvailable;
        self.sensorsInUse = viewConfig.sensorsInUse;
      }
    };

    this.deleteItem = function(index){
      self.sensorsAvailable.push(self.sensorsInUse[index]);
      self.sensorsInUse.splice(index, 1);
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
      chartHandler.goLive();
      $mdDialog.hide();
    };

    this.showDelete = false;
    this.initArrays();

  });
