'use strict';

describe('Controller: ShowfurtherCtrl', function () {

  // load the controller's module
  beforeEach(module('loggrioApp'));

  var ShowfurtherCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowfurtherCtrl = $controller('ShowfurtherCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
