'use strict';

/**
 * @ngdoc directive
 * @name loggrioApp.directive:passwordsMatch
 * @description
 * # passwordsMatch
 */
angular.module('loggrioApp')
  .directive('passwordsMatch', function () {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=matchTo'
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.passwordsMatch = function(modelValue) {
          return modelValue === scope.otherModelValue;
        };

        scope.$watch('otherModelValue', function() {
          ngModel.$validate();
        });
      }
    };
  });
