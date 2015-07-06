module.exports = function(Metering) {
  Metering.validateAsync('time', timeValidator, {message: 'Bad Time'});
  function timeValidator(err, done) {
    var self = this;
    Metering.findOne(
      {where: {'sensorId': self.sensorId}, order: 'time DESC'},
      function (e, metering) {
        if (metering && metering.time >= self.time) {
          err();
        }
        done();
      }
    );
  }
};
