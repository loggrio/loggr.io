'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('LoginCtrl', function ($rootScope, $location, Customer) {

    if (Customer.isAuthenticated()) {
      $location.path('/');
      return;
    }

    this.loginCredentials = {};
    this.retypePassword = '';
    this.registerToggled = false;

    var self = this;

    this.login = function () {
      Customer.login(self.loginCredentials, function() {
        var next = $location.nextAfterLogin || '/';
        $location.nextAfterLogin = null;
        $location.path(next);
        self.loginCredentials = {};
        $rootScope.user = Customer.getCurrent();
      });
    };

    this.register = function () {
      self.registerToggled = true;
      Customer.create(self.loginCredentials, function () {
        self.retypePassword = '';
        self.login();
      });
    };

    this.registerToggle = function () {
      self.registerToggled = !self.registerToggled;
    };

  });
