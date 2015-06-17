'use strict';

describe('Service: chartHandler', function () {

  // load the service's module
  beforeEach(module('loggrioApp'));

  // instantiate service
  var chartHandler;
  beforeEach(inject(function (_chartHandler_) {
    chartHandler = _chartHandler_;
  }));

  it('should do something', function () {
    expect(!!chartHandler).toBe(true);
  });

});
