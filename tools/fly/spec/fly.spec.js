describe("Fly", function () {
  var Fly = require("../js/fly");

  it("calculates the return date, given a start and duration", function () {
    var startDate = new Date("2015-01-01");
    var durationDays = 7;

    var fly = new Fly();
    var result = fly.addDaysToDate(startDate, durationDays);

    expect(result.getDate()).toEqual(7);
    expect(result.getMonth()).toEqual(0);
    expect(result.getFullYear()).toEqual(2015);
  });

  it("formats date for the search url", function () {
    var date = new Date("2015-01-25");

    var fly = new Fly();
    var result = fly.formatDateForSearchUrl(date);

    expect(result).toEqual("150125");
  });

  it("returns search urls, given a start, duration, variation, origin & destiny", function () {
    var startDate = new Date("2015-01-01");
    var durationDays = 7;
    var variationDays = 3;
    var origin = "stoc";
    var destiny = "saoa";

    var fly = new Fly();
    var result = fly.getSearchUrls(startDate, durationDays, variationDays, origin, destiny);

    expect(result.length).toEqual(3);
    expect(result).toContain("http://www.skyscanner.com/transport/flights/stoc/saoa/150101/150107");
    expect(result).toContain("http://www.skyscanner.com/transport/flights/stoc/saoa/150102/150108");
    expect(result).toContain("http://www.skyscanner.com/transport/flights/stoc/saoa/150103/150109");
  });

  it("binds view with business logic", function () {
    var doc = jasmine.createSpyObj("doc", ["querySelector"]);

    var win = jasmine.createSpyObj("win", ["open", "focus"]);
    win.document = doc;

    var evt = jasmine.createSpyObj("evt", ["preventDefault"]);
    var formEl = jasmine.createSpyObj("form", ["addEventListener"]);
    var startEl = {value: new Date("2015-01-01")};
    var durationEl = {value: 7};
    var variationEl = {value: 3};
    var originEl = {value: "saoa"};
    var destinyEl = {value: "stoc"};

    doc.querySelector.and.callFake(function (argument) {
      var map = {
        "#container form": formEl,
        "#container form .start": startEl,
        "#container form .duration": durationEl,
        "#container form .variation": variationEl,
        "#container form .origin": originEl,
        "#container form .destiny": destinyEl
      };

      return map[argument];
    });

    var fly = new Fly();
    spyOn(fly, "getSearchUrls").and.returnValue([
      "http://www.skyscanner.com/transport/flights/stoc/saoa/150101/150107",
      "http://www.skyscanner.com/transport/flights/stoc/saoa/150102/150108",
      "http://www.skyscanner.com/transport/flights/stoc/saoa/150103/150109"
    ]);

    fly.setupView(win, "#container");

    expect(formEl.addEventListener.calls.mostRecent().args[0]).toEqual("submit");
    formEl.addEventListener.calls.mostRecent().args[1](evt);
    expect(evt.preventDefault).toHaveBeenCalled();

    var searchCall = fly.getSearchUrls.calls.mostRecent();
    expect(searchCall.args[0]).toEqual(new Date(startEl.value));
    expect(searchCall.args[1]).toBe(durationEl.value);
    expect(searchCall.args[2]).toBe(variationEl.value);
    expect(searchCall.args[3]).toBe(originEl.value);
    expect(searchCall.args[4]).toBe(destinyEl.value);

    expect(win.open.calls.count()).toBe(3);
  });
});
