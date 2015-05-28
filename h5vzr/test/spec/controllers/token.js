'use strict';

describe('Controller: TokenCtrl', function () {

  // load the controller's module
  beforeEach(module('loggrioApp'));

  var TokenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TokenCtrl = $controller('TokenCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
