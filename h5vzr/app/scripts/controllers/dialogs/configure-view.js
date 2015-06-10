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

    var payload = {};

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

    this.init = function(){
      if(!localStorage.getItem('SensorsInUse')&&!localStorage.getItem('SensorsAvailable')){
        for (var i = 0; i < this.sensors.length; i++) {
          this.sensorsAvailable[i] = this.sensors[i];
        }
      }
    };

    this.inUseConfig = {
      group: { name: 'shared', pull: false, put: true },
      ghostClass: 'ghost',
      animation: 150,
      store: {
        /**
         * Get the order of elements. Called once during initialization.
         * @param   {Sortable}  sortable
         * @returns {Array}
         */
        get: function (sortable) {
            var orderString = localStorage.getItem('SensorsInUse');
            var order = orderString ? orderString.split('|') : [];
            if(orderString){
              self.sensorsInUse = [];
              for (var i = 0; i < order.length; i++) {
                self.sensorsInUse[i] = self.sensors[order[i]];
              }
            }
            return order;
        },

        /**
         * Save the order of elements. Called onEnd (when the item is dropped).
         * @param {Sortable}  sortable
         */
        set: function (sortable) {
            var order = sortable.toArray();
            // self.SensorsInUse = [];
            // for (var i = 0; i < order.length; i++) {
            //   self.sensorsInUse[i] = self.sensors[order[i]];
            // }
            //
            localStorage.setItem('SensorsInUse', order.join('|'));
        }
      },
      onAdd: function (evt) {
        var order = [];
        // self.sensorsInUse = [];
        //console.log(JSON.stringify(self.sensorsInUse));
        for (var i = 0; i < evt.models.length; i++) {
          order[i] = evt.models[i].id;
          // self.sensorsInUse[i] = self.sensors[order[i]];
        }

        localStorage.setItem('SensorsInUse', order.join('|'));
      },
    };

    this.availableConfig = {
      group: { name: 'shared', pull: true, put: false },
      sort: false,
      ghostClass: 'ghost',
      animation: 150,
      store: {
        /**
         * Get the order of elements. Called once during initialization.
         * @param   {Sortable}  sortable
         * @returns {Array}
         */
        get: function (sortable) {
          var orderString = localStorage.getItem('SensorsAvailable');
          var order = orderString ? orderString.split('|') : [];
          if(orderString){
            self.sensorsAvailable = [];
            for (var i = 0; i < order.length; i++) {
              self.sensorsAvailable[i] = self.sensors[order[i]];
            }
          }
          return order;
        },

        /**
         * Save the order of elements. Called onEnd (when the item is dropped).
         * @param {Sortable}  sortable
         */
        set: function (sortable) {
          var order = sortable.toArray();
          // self.sensorsAvailable = [];
          // for (var i = 0; i < order.length; i++) {
          //   self.sensorsAvailable[i] = self.sensors[order[i]];
          // }

          localStorage.setItem('SensorsAvailable', order.join('|'));
        },
      }

    };


    this.showDelete = false;

    this.init();

    this.cancel = function () {
      $mdDialog.cancel();
    };

    this.submit = function () {
      $mdDialog.hide(payload);
    };

  });
