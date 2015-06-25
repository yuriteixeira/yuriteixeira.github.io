describe("Fly", function () {
  var Fly = require("../js/fly");

  it("should call console.log, when started", function () {
    var console = jasmine.createSpyObj("console", ["log"]);
    var fly = new Fly(console);

    fly.start();

    expect(console.log.calls.count()).toBe(1);
    expect(console.log.calls.argsFor(0)[0]).toBe("FLY >>> started");
  });
});
