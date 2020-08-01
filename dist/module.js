import { createNaturalLanguageDuration } from "./natural-lang-date-range.js";
var dateRangeDOMSelector = "#calculated-range";
var dateRangeDOM = document.querySelector(dateRangeDOMSelector);

if (dateRangeDOM) {
  // Get Natural language date range
  var WEDDING_DATE = new Date(2016, 6, 22).valueOf();
  var NOW = Date.now();
  var naturalLanguageString = createNaturalLanguageDuration({
    start: WEDDING_DATE,
    end: NOW
  }); // Replace content with date duration string

  dateRangeDOM.textContent = naturalLanguageString;
} else {
  throw new Error("DOM mount point for the date range string was not found. Looking for ".concat(dateRangeDOMSelector));
}