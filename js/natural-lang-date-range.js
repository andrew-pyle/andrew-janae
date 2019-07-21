const MONTHS_IN_YEAR = 12;
const MILLISECS_IN_YEAR = 1000 * 60 * 60 * 24 * 365;

/**
 * Returns a string describing the approximate time in years and months between two dates
 * @param {number} startDate milliseconds since UNIX epoch of start date
 * @param {number} endDate milliseconds since UNIX epoch of end date
 */
function getNaturalLanguageRange(startDate, endDate) {
  const differenceInMillisecs = endDate - startDate;
  const differenceInYears = differenceInMillisecs / MILLISECS_IN_YEAR;

  const yearsSinceStartDate = Math.floor(differenceInYears);
  const monthsRemainderDecimal = differenceInYears - yearsSinceStartDate;
  const monthsRemainderInteger = Math.round(
    MONTHS_IN_YEAR * monthsRemainderDecimal
  );

  const roundedYearsSinceStartDate =
    monthsRemainderInteger < 12 ? yearsSinceStartDate : yearsSinceStartDate + 1;
  const roundedMonthsRemainderInteger =
    monthsRemainderInteger < 12 ? monthsRemainderInteger : null;

  const naturalLanguageString =
    `${roundedYearsSinceStartDate} years` +
    (roundedMonthsRemainderInteger
      ? ` & ${roundedMonthsRemainderInteger} months`
      : "");

  return naturalLanguageString;
}

export { getNaturalLanguageRange };
