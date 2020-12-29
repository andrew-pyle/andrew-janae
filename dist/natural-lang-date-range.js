import { intervalToDuration, formatDuration } from "https://cdn.skypack.dev/pin/date-fns@v2.16.1-kiAGbZM0AiQ3q2YJfvfc/min/date-fns.js";
/**
 * Converts a start date & end date into a description in English
 * @param {{start: number, end: number}} interval The date interval to convert into a description in natural language
 * @returns {string} Description of the duration in English
 */

export function createNaturalLanguageDuration(_ref) {
  var {
    start,
    end
  } = _ref;
  var duration = intervalToDuration({
    start,
    end
  });
  var dateString = formatDuration(duration, {
    format: ["years", "months"]
  });
  return dateString;
}