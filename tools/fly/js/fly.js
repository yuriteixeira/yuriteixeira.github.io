var Fly = function () {};

Fly.prototype.addDaysToDate = function (startDate, durationDays) {
  var startMils = startDate.getTime();
  var realDurationDays = durationDays - 1;
  var realDurationDaysMils = realDurationDays * 24 * 60 * 60 * 1000;
  var returnDateMils = startMils + realDurationDaysMils;
  var returnDate = new Date(returnDateMils);
  return returnDate;
};

Fly.prototype.formatDateForSearchUrl = function (date) {
  var twoDigitsYear = String(date.getFullYear()).slice(-2);
  var month = String(date.getMonth() + 1);
  var twoDigitsMonth = month.length > 1 ? month : "0" + month;
  var day = String(date.getDate());
  var twoDigitsDay = day.length > 1 ? day : "0" + day;
  var formattedDate = twoDigitsYear + twoDigitsMonth + twoDigitsDay;
  return formattedDate;
};

Fly.prototype.getSearchUrls = function (startDate, durationDays, variationDays, origin, destiny) {
  var urls = [];

  for (var i = 0; i < variationDays; i++) {
    var iterStartDate = this.addDaysToDate(startDate, i + 1);
    var iterReturnDate = this.addDaysToDate(iterStartDate, durationDays);
    var templateUrl = "http://www.skyscanner.com/transport/flights/%o/%d/%s/%e";
    var url = templateUrl
      .replace("%o", origin)
      .replace("%d", destiny)
      .replace("%s", this.formatDateForSearchUrl(iterStartDate))
      .replace("%e", this.formatDateForSearchUrl(iterReturnDate))
    ;
    urls.push(url);
  }

  return urls;
};


module.exports = Fly;
