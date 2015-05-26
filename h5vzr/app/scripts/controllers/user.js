'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('UserCtrl', function ($mdDialog) {

    this.logOut = function (ev) {
      $mdDialog.show({
        targetEvent: ev,
        template: '<md-dialog aria-label="logOut dialog">' +
        '  <md-dialog-content>' +
        '   <md-progress-circular style="margin-left:40%" md-mode="indeterminate"></md-progress-circular>' +
        '   <p>Sie werden nun vom System abgemeldet</p>' +
        '  </md-dialog-content>' +
        '</md-dialog>'
      });
      /*
       * add auth-stuff here
       */
      setTimeout(function () {
        location.reload();
      }, 3000);
    };
  });
