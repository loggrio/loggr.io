'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:UserControlCtrl
 * @description
 * # UserControlCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('UserControlCtrl', function ($http, $mdDialog, Customer) {

    this.customer = {};
    this.customer = Customer.getCurrent();

    console.log(Customer.prototype$__get__accessTokens());
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
        this.formInvalid = false;
      } else {
        this.formInvalid = true;
      }
    };

    this.cancel = function () {
      $mdDialog.cancel();
    };

    this.submit = function () {
      this.customer.$save();
      $mdDialog.hide();
    };



    // Auth vars
    // console.log(Customer.isAuthenticated());
    // console.log(Customer.getCurrent().username);
    // console.log(Customer.getCachedCurrent()); // will be null, when  getCurrent() not already called
    // console.log(Customer.getCurrentId());
  });
