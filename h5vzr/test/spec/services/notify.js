'use strict';

describe('Service: notify', function () {

  // load the service's module
  beforeEach(module('loggrioApp'));

  // instantiate service
  var notify;
  beforeEach(inject(function (_notify_) {
    notify = _notify_;
  }));

  it('should do something', function () {
    expect(!!notify).toBe(true);
  });

});
