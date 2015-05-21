'use strict';

/**
 * @ngdoc directive
 * @name loggrioApp.directive:flip
 * @description
 * # flip
 */
angular.module('loggrioApp')
  .directive('flip', function () {
    return {
      restrict: 'E',
      controller: function () {

        var self = this;
        self.front = null;
        self.back = null;


        function showFront() {
          self.front.removeClass('flipHideFront');
          self.back.addClass('flipHideBack');
        }

        function showBack() {
          self.back.removeClass('flipHideBack');
          self.front.addClass('flipHideFront');
        }

        self.init = function () {
          self.front.addClass('flipBasic');
          self.back.addClass('flipBasic');

          showFront();
          self.front.on('click', showBack);
          self.back.on('click', showFront);
        };

      },

      link: function (scope, element, attrs, ctrl) {
        element.addClass('flip');

        if (ctrl.front && ctrl.back) {
          ctrl.init();
        }
        else {
          console.error('FLIP: 2 panels required.');
        }
      }
    };
  });
