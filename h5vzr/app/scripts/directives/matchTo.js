'use strict';

/**
 * @ngdoc directive
 * @name loggrioApp.directive:matchTo
 * @description
 * # matchTo
 */
angular.module('loggrioApp')
  .directive('matchTo', function () {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=matchTo'
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.matchTo = function(modelValue) {
          return modelValue === scope.otherModelValue;
        };

        scope.$watch('otherModelValue', function() {
          ngModel.$validate();
        });
      }
    };
  });
