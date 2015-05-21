'use strict';

describe('Directive: flip', function () {

  // load the directive's module
  beforeEach(module('loggrioApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<flip></flip>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the flip directive');
  }));
});
