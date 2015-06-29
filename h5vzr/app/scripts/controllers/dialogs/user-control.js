'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:UserControlCtrl
 * @description
 * # UserControlCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('UserControlCtrl', function ($rootScope, $mdDialog, Customer) {

    this.customer = Customer.getCachedCurrent();

    this.passChanging = false;
    this.formInvalid = false;
    this.oldPass = 'passwort';
    this.confirmPass = '';
    this.newPWMatch = false;

    /**
     * Once password changing is initiated, user can only cancel by
     * clicking on abort an closing the dialog, otherwise fields whould
     * get hidden again and the password would be set to empty string
     */
    this.startChangingPassword = function () {
      if (!this.passChanging) {
        this.passChanging = !this.passChanging;
        this.formInvalid = !this.formInvalid;
        this.oldPass = '';
        this.formInvalid = true;
      }
    };

    this.checkNewCred = function () {
      if (this.confirmPass === this.oldPass) {
        this.newPWMatch = true;
      } else {
        this.newPWMatch = false;
      }

      if (this.newPWMatch) {
        var buffer = this.customer;
        this.customer = new Customer({id: buffer.id, username: buffer.username, email: buffer.email, password: this.confirmPass});
        this.formInvalid = false;
      } else {
        this.formInvalid = true;
      }
    };

    this.submit = function () {
      Customer.prototype$updateAttributes({ id: this.customer.id }, this.customer, function (user) {
        $rootScope.user = user;
      });
      $mdDialog.hide();
    };

    this.cancel = function () {
      $mdDialog.cancel();
    };

  });
