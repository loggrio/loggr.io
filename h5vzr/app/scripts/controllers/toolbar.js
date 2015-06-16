'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:ShowFurtherCtrl
 * @description
 * # ToolbarCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('ToolbarCtrl', function ($location, $mdDialog, Customer) {

    this.logout = function () {
      Customer.logout(function () {
        $location.path('/login');
      });
    };

    this.aboutDialog = function (ev) {
      $mdDialog.show({
        controller: 'CommonDialogCtrl',
        controllerAs: 'about',
        templateUrl: 'views/dialogs/about.html',
        targetEvent: ev
      });
    };

    this.imprintDialog = function (ev) {
      $mdDialog.show({
        controller: 'CommonDialogCtrl',
        controllerAs: 'imprint',
        templateUrl: 'views/dialogs/imprint.html',
        targetEvent: ev
      });
    };

    this.userControlDialog = function (ev) {
      $mdDialog.show({
        controller: 'UserControlCtrl',
        controllerAs: 'userControl',
        templateUrl: 'views/dialogs/user-control.html',
        targetEvent: ev
      });
    };

  });
