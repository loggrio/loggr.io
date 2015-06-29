'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:ShowFurtherCtrl
 * @description
 * # ToolbarCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('ToolbarCtrl', function ($location, $mdDialog, Customer, chartHandler) {

    this.isAuthed =  function () {
      return Customer.isAuthenticated();
    };

    this.logout = function () {
      Customer.logout(function () {
        chartHandler.stopReload();
        $location.path('/login');
      });
    };

    this.aboutDialog = function (ev) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'CommonCtrl',
        controllerAs: 'about',
        templateUrl: 'views/dialogs/about.html',
        targetEvent: ev
      });
    };

    this.imprintDialog = function (ev) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'CommonCtrl',
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
