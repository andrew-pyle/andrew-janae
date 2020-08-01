import { createNaturalLanguageDuration } from "./natural-lang-date-range.js";

const dateRangeDOMSelector = "#calculated-range";
const dateRangeDOM = document.querySelector(dateRangeDOMSelector);

if (dateRangeDOM) {
  // Get Natural language date range
  const WEDDING_DATE = new Date(2016, 6, 22).valueOf();
  const NOW = Date.now();
  const naturalLanguageString = createNaturalLanguageDuration({
    start: WEDDING_DATE,
    end: NOW,
  });
  // Replace content with date duration string
  dateRangeDOM.textContent = naturalLanguageString;
} else {
  throw new Error(
    `DOM mount point for the date range string was not found. Looking for ${dateRangeDOMSelector}`
  );
}
