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

    this.customer = $rootScope.user;

    this.passChanging = false;
    this.formInvalid = false;
    this.oldPass = 'passwort';
    this.newPass = '';
    this.confirmPass = '';
    this.oldPWMatch = true; // set to false when authService is ready
    this.newPWMatch = false;

    this.startChangingPassword = function () {
      if (!this.passChanging) {
        this.passChanging = !this.passChanging;
        this.formInvalid = !this.formInvalid;
        this.oldPass = '';
        this.formInvalid = true;
      }
    };

    this.checkOldCred = function () {
      this.startChangingPassword();
      /* waiting for authService
       if(authService.oldCredCheck(this.userData.password)) {
       this.oldPWMatch = true;
       }*/
    };

    this.checkNewCred = function () {

      if (this.newPass === this.confirmPass) {
        this.newPWMatch = true;
      } else {
        this.newPWMatch = false;
      }

      if (this.oldPWMatch && this.newPWMatch) {
        var buffer = this.customer;
        this.customer = new Customer({id: buffer.id, username: buffer.username, email: buffer.email, password: this.confirmPass});
        this.formInvalid = false;
      } else {
        this.formInvalid = true;
      }
    };

    this.cancel = function () {
      $rootScope.user = Customer.getCurrent();
      $mdDialog.cancel();
    };

    this.submit = function () {
      Customer.prototype$updateAttributes({ id: this.customer.id }, this.customer);
      $mdDialog.hide();
    };

  });
