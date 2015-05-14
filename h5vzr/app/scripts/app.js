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
      .icon('account-circle', 'bower_components/material-design-icons/action/svg/production/ic_account_circle_24px.svg')
      .icon('more-vert', 'bower_components/material-design-icons/navigation/svg/production/ic_more_vert_24px.svg');

    // TODO: seperate cfg file
    LoopBackResourceProvider.setUrlBase('http://localhost:3000/api/');
  });
