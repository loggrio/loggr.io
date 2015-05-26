'use strict';

/**
 * @ngdoc directive
 * @name loggrioApp.directive:flipPanel
 * @description
 * # flipPanel
 */
angular.module('loggrioApp')
  .directive('flipPanel', function () {
    return {
      restrict: 'E',
      require: '^flip',
      //transclusion : true,
      link: function (scope, element, attrs, flipCtr) {
        if (!flipCtr.front) {
          flipCtr.front = element;
        }
        else if (!flipCtr.back) {
          flipCtr.back = element;
        }
        else {
          console.error('FLIP: Too many panels.');
        }
      }
    };
  });
