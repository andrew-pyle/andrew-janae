var MONTHS_IN_YEAR = 12;
var MILLISECS_IN_YEAR = 1000 * 60 * 60 * 24 * 365;
/**
 * Returns a string describing the approximate time in years and months between two dates
 * @param {number} startDate milliseconds since UNIX epoch of start date
 * @param {number} endDate milliseconds since UNIX epoch of end date
 */

function getNaturalLanguageRange(startDate, endDate) {
  var differenceInMillisecs = endDate - startDate;
  var differenceInYears = differenceInMillisecs / MILLISECS_IN_YEAR;
  var yearsSinceStartDate = Math.floor(differenceInYears);
  var monthsRemainderDecimal = differenceInYears - yearsSinceStartDate;
  var monthsRemainderInteger = Math.round(MONTHS_IN_YEAR * monthsRemainderDecimal);
  var roundedYearsSinceStartDate = monthsRemainderInteger < 12 ? yearsSinceStartDate : yearsSinceStartDate + 1;
  var roundedMonthsRemainderInteger = monthsRemainderInteger < 12 ? monthsRemainderInteger : 0;
  var naturalLanguageString = buildTimeString(roundedYearsSinceStartDate, roundedMonthsRemainderInteger);
  return naturalLanguageString;
}
/**
 * Builds natural language statement of years and months. Plurals are handled.
 * @param {number} years Number of years to include in string
 * @param {number|null} months Number of months to include in string. Null if none.
 */


function buildTimeString(years, months) {
  var yearUnits = pluralTimeWord("year", years);
  var monthUnits = pluralTimeWord("month", months); // Include months if we have them

  if (months && months > 0) {
    return "".concat(years, " ").concat(yearUnits, " & ").concat(months, " ").concat(monthUnits);
  } // No months
  else {
      return "".concat(years, " ").concat(yearUnits);
    }
}
/**
 * Pluralizes time words properly. Accepts month and year only.
 * @param {string} period Time word: month or year
 * @param {number} number quantity of period
 */


function pluralTimeWord(period, number) {
  switch (period) {
    case "year":
      return number === 1 ? "year" : "years";

    case "month":
      return number === 1 ? "month" : "months";

    case "day":
      return number === 1 ? "day" : "days";

    default:
      return "";
  }
}

export { getNaturalLanguageRange };