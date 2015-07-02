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
    }

    var self = this;

    this.loginCredentials = {};
    this.retypePassword = '';
    this.registerToggled = false;

    this.loginError = false;
    this.registerError = false;

    this.login = function () {
      Customer.login(self.loginCredentials, function() {
        var next = $location.nextAfterLogin || '/';
        $location.nextAfterLogin = null;
        $location.path(next);
      }, function () {
        self.loginError = true;
      });
    };

    this.register = function () {
      self.registerToggled = true;
      Customer.create(self.loginCredentials, function () {
        self.retypePassword = '';
        self.login();
      }, function () {
        self.registerError = true;
      });
    };

    this.registerToggle = function () {
      self.registerToggled = !self.registerToggled;
    };

  });
