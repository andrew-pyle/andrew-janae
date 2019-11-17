/**
 * Algorithm
 * - Use unix epoch time parameters
 * - Find the number of whole multiples of MILLISECS_IN_YEAR contained in
 *   range, Store that value as numYears
 * - Find remaining milliseconds in duration, save as millisecsRemaining.
 * - Divide millisecsRemaining by MILLISECS_IN_MONTH, rounding to int.
 *   Save as numMonths
 * - Return (numYears, numMonths).
 */

/* Constants */
let _MILLISECS_IN_SECOND: float = 1000.0;
let _SECONDS_IN_MINUTE: float = 60.0;
let _MINUTES_IN_HOUR: float = 60.0;
let _HOURS_IN_DAY: float = 24.0;
let _DAYS_IN_YEAR: float = 365.0;
let _MILLISECS_IN_YEAR: float =
  _MILLISECS_IN_SECOND
  *. _SECONDS_IN_MINUTE
  *. _MINUTES_IN_HOUR
  *. _HOURS_IN_DAY
  *. _DAYS_IN_YEAR;
let _MONTHS_IN_YEAR = 12;

let yearsAndMonthsInDuration = (startDate: float, endDate: float): (int, int) => {
  // Js.log2("startDate", startDate);
  // Js.log2("endDate", endDate);

  // ex. 104776427131
  let duration = endDate -. startDate;

  // Js.log2("duration", duration);

  // Js.log2("_MILLISECS_IN_YEAR", _MILLISECS_IN_YEAR);

  /* Get Years */
  // 3.3322438
  let decimalYearsInDuration = duration /. _MILLISECS_IN_YEAR;

  // Js.log2("decimalYearsInDuration", decimalYearsInDuration);

  // 3 |.3322438
  let wholeYearsInDuration = int_of_float(decimalYearsInDuration);
  // 0.3322438
  let yearFractionRemaining =
    decimalYearsInDuration -. float_of_int(wholeYearsInDuration);

  /* Get Months */
  // 3.86926...
  let decimalMonthsInRemainder =
    yearFractionRemaining *. float_of_int(_MONTHS_IN_YEAR);

  // Js.log2("decimalMonthsInRemainder", decimalMonthsInRemainder);

  // 3 |.86926...
  let wholeMonthsInRemainder = int_of_float(decimalMonthsInRemainder);
  // 0.86926
  let monthFractionRemaining =
    decimalMonthsInRemainder -. float_of_int(wholeMonthsInRemainder);

  // 0.86926 > 0.5 == true, therefore 3+1
  let totalMonths =
    monthFractionRemaining < 0.5
      ? wholeMonthsInRemainder : wholeMonthsInRemainder + 1;

  // Js.log2("monthFractionRemaining", monthFractionRemaining);
  // Js.log2("totalMonths", totalMonths);

  // Return ex. (3, 4)
  (wholeYearsInDuration, totalMonths);
};

let naturalLanguageString = (years: int, months: int): string => {
  let yearString =
    switch (years) {
    | 1 => string_of_int(years) ++ " year"
    | num when num >= 1 => string_of_int(num) ++ " years"
    | _ => ""
    };

  let monthString =
    switch (months) {
    | 1 => string_of_int(months) ++ " month"
    | num when num >= 1 => string_of_int(num) ++ " months"
    | _ => ""
    };

  yearString ++ " & " ++ monthString;
};

let createNaturalLanguageDuration =
    (startDate: Js.Date.t, endDate: Js.Date.t): string => {
  let startDateUnix = Js.Date.valueOf(startDate);
  let endDateUnix = Js.Date.valueOf(endDate);

  let (years, months) = yearsAndMonthsInDuration(startDateUnix, endDateUnix);
  let s = naturalLanguageString(years, months);

  s;
};