'use strict';

describe('Service: chartMenu', function () {

  // load the service's module
  beforeEach(module('loggrioApp'));

  // instantiate service
  var chartMenu;
  beforeEach(inject(function (_chartMenu_) {
    chartMenu = _chartMenu_;
  }));

  it('should do something', function () {
    expect(!!chartMenu).toBe(true);
  });

});
