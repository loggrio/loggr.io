'use strict';

describe('Service: zoom', function () {

  // load the service's module
  beforeEach(module('loggrioApp'));

  // instantiate service
  var zoom;
  beforeEach(inject(function (_zoom_) {
    zoom = _zoom_;
  }));

  it('should do something', function () {
    expect(!!zoom).toBe(true);
  });

});
