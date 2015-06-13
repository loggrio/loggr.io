'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:UserControlCtrl
 * @description
 * # UserControlCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('UserControlCtrl', function ($mdDialog) {


    this.userData = {
      name: 'Hans Dampf',
      mail: 'Hans@dam.pf',
      location: 'Daheim',
      password: 'geheim'
    };

    this.passChanging = false;
    this.formInvalid = false;
    this.newPass = '';
    this.confirmPass = '';
    this.oldPWMatch = true;
    this.newPWMatch = false;

    this.startChangingPassword = function () {
      if (!this.passChanging) {
        this.passChanging = !this.passChanging;
        this.formInvalid = !this.formInvalid;
        this.userData.password = '';
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
      var url = 'http://localhost:3000/api/Customers/';
//TODO: get customer ID, authservie...
      var payload = {
        "username": this.userData.name,
        "password": "object", //passwort
        "email": this.userData.mail
      };
      console.log('new userdata saved!');
      console.log(this.userData);

      $mdDialog.hide(payload);
    };

  });
