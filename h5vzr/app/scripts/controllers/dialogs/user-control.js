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

  this.changingPassword = function () {

    var oldPw = this.userData.password;
    var oldPWMatch = false;
    var newPWMatch = false;

    this.passChanging = !this.passChanging;
    this.userData.password = '';
    $('#saveButton').prop('disabled', true);

    $('#oldPw').on('keyup', function () {
      if ($('#oldPw').val() === oldPw) {
        console.log('old pw matches');
        oldPWMatch = true;
      }
    });

    $('#confirmPass').on('keyup', function () {
      if ($('#confirmPass').val() === $('#newPass').val()) {
        console.log('new pw matches');
        newPWMatch = true;
      }

      if (oldPWMatch && newPWMatch) {
        $('#saveButton').prop('disabled', false);
      }
    });


  };

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
    * auth.logOut(userID);
    */
    setTimeout(function () {
      location.reload();
    }, 3000);
  };

  // TODO: bind to form
  var payload = {};

  this.cancel = function () {
    $mdDialog.cancel();
  };

  this.submit = function () {
    var buffer = data;
    buffer.password = $('#confirmPass').val();

    this.userData = buffer;
    console.log('new userdata saved!');
    console.log(this.userData);

    $mdDialog.hide(payload);
  };

});
