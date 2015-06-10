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

    // TODO: seperate cfg file
    LoopBackResourceProvider.setUrlBase('http://localhost:3000/api/');
  });
