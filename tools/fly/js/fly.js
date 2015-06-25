var Fly = function (console) {
  this.console = console;
};

Fly.prototype.start = function () {
  this.console.log('FLY >>> started');
};

module.exports = Fly;
