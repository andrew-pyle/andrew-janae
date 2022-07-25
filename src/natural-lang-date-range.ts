import { intervalToDuration, formatDuration } from "date-fns";
// import {
//   intervalToDuration,
//   formatDuration,
// } from "https://cdn.skypack.dev/pin/date-fns@v2.16.1-kiAGbZM0AiQ3q2YJfvfc/min/date-fns.js";

/**
 * Converts a start date & end date into a description in English
 * @param {{start: number, end: number}} interval The date interval to convert into a description in natural language
 * @returns {string} Description of the duration in English
 */
export function createNaturalLanguageDuration({ start, end }) {
  const duration = intervalToDuration({ start, end });
  const dateString = formatDuration(duration, {
    format: ["years", "months", "weeks", "days"],
    delimiter: ", ",
  });
  return dateString;
}
