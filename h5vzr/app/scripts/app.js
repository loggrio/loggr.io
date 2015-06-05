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
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

    $mdThemingProvider.theme('default')
      .primaryPalette('teal');

    $mdIconProvider
      .icon('account-circle', 'images/svg/ic_account_circle_24px.svg', 24)
      .icon('options', 'images/svg/ic_menu_24px.svg', 24)
      .icon('add', 'images/svg/ic_add_24px.svg', 24)
      .icon('edit', 'images/svg/ic_edit_24px.svg', 24)
      .icon('tune', 'images/svg/ic_tune_24px.svg', 24)
      .icon('more-vert', 'images/svg/ic_more_vert_24px.svg', 24)
      .icon('email', 'images/svg/ic_email_24px.svg', 24)
      .icon('location', 'images/svg/ic_location_on_24px.svg', 24)
      .icon('password', 'images/svg/ic_security_24px.svg', 24)
      .icon('loggr-icon', 'images/svg/loggr_icon_white.svg', 48);

    // TODO: seperate cfg file
    LoopBackResourceProvider.setUrlBase('http://localhost:3000/api/');
  });
