'use strict';

/**
 * @ngdoc overview
 * @name loggrioApp
 * @description
 * # loggrioApp
 *
 * Main module of the application.
 */
angular
  .module('loggrioApp', [
    'ngRoute',
    'ngAnimate',
    'ngAria',
    'ngMaterial',
    'ngMfb',
    'highcharts-ng',
    'lbServices'
  ])
  .config(function ($routeProvider, $mdThemingProvider, $mdIconProvider, LoopBackResourceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

    $mdThemingProvider.theme('default')
      .primaryPalette('teal');

    $mdIconProvider
      .icon('account-circle', 'bower_components/material-design-icons/action/svg/production/ic_account_circle_24px.svg', 24)
      .icon('options', 'bower_components/material-design-icons/navigation/svg/production/ic_menu_24px.svg', 24)
      .icon('add', 'bower_components/material-design-icons/content/svg/production/ic_add_24px.svg', 24)
      .icon('edit', 'bower_components/material-design-icons/image/svg/production/ic_edit_24px.svg', 24)
      .icon('tune', 'bower_components/material-design-icons/image/svg/production/ic_tune_24px.svg', 24)
      .icon('more-vert', 'bower_components/material-design-icons/navigation/svg/production/ic_more_vert_24px.svg', 24)
      .icon('email', 'bower_components/material-design-icons/communication/svg/production/ic_email_24px.svg', 24)
      .icon('location', 'bower_components/material-design-icons/communication/svg/production/ic_location_on_24px.svg', 24)
      .icon('password', 'bower_components/material-design-icons/communication/svg/production/ic_security_24px.svg', 24)
      .icon('loggr-icon', 'images/loggr_icon_white.svg', 48);

    // TODO: seperate cfg file
    LoopBackResourceProvider.setUrlBase('http://localhost:3000/api/');
  });
