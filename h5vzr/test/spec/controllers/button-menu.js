'use strict';

describe('Controller: ButtonMenuCtrl', function () {

  // load the controller's module
  beforeEach(module('loggrioApp'));

  var ButtonMenuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ButtonMenuCtrl = $controller('ButtonMenuCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
