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

    this.errors = {};

    this.login = function () {
      Customer.login(self.loginCredentials, function() {
        var next = $location.nextAfterLogin || '/';
        $location.nextAfterLogin = null;
        $location.path(next);
      }, function () {
        self.errors.loginFailed = true;
      });
    };

    this.register = function () {
      self.registerToggled = true;
      Customer.create(self.loginCredentials, function () {
        self.retypePassword = '';
        self.login();
      }, function () {
        self.errors.loginFailed = true;
      });
    };

    this.registerToggle = function () {
      self.errors = {};
      self.registerToggled = !self.registerToggled;
    };

  });
