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

    // TODO: bind to form
    var payload = {};

    this.inUse = ['Temperatur',
                  'Luftfeuchtigkeit'];
    this.inUseConfig = {
      group: { name: 'shared', pull: false, put: true },
      ghostClass: 'ghost',
      animation: 150
    };

    this.available = ['Luftdruck',
                      'Helligkeit'];
    this.availableConfig = {
      group: { name: 'shared', pull: true, put: false },
      sort: false,
      ghostClass: 'ghost',
      animation: 150
    };

    this.cancel = function () {
      $mdDialog.cancel();
    };

    this.submit = function () {
      $mdDialog.hide(payload);
    };

  });
