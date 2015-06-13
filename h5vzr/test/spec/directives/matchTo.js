'use strict';

describe('Directive: matchTo', function () {

  // load the directive's module
  beforeEach(module('loggrioApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<match-To></match-To>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the passwordsMatch directive');
  }));
});
