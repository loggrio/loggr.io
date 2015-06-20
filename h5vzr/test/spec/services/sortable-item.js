'use strict';

describe('Service: sortableItem', function () {

  // load the service's module
  beforeEach(module('loggrioApp'));

  // instantiate service
  var sortableItem;
  beforeEach(inject(function (_sortableItem_) {
    sortableItem = _sortableItem_;
  }));

  it('should do something', function () {
    expect(!!sortableItem).toBe(true);
  });

});
