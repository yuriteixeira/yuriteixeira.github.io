describe("Fly", function () {
  var Fly = require("../js/fly");

  it("calculate the return date, given a start and duration", function () {
    var startDate = new Date("2015-01-01");
    var durationDays = 7;

    var fly = new Fly();
    var result = fly.addDaysToDate(startDate, durationDays);

    expect(result.getDate()).toEqual(7);
    expect(result.getMonth()).toEqual(0);
    expect(result.getFullYear()).toEqual(2015);
  });

  it("format date for the search url", function () {
    var date = new Date("2015-01-25");

    var fly = new Fly();
    var result = fly.formatDateForSearchUrl(date);

    expect(result).toEqual("150125");
  });

  it("return search urls, given a start, duration, variation, origin & destiny", function () {
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
});
