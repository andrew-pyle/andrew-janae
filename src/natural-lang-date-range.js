import {
  intervalToDuration,
  formatDuration,
} from "https://cdn.skypack.dev/date-fns";

/**
 * Converts a start date & end date into a description in English
 * @param {{start: number, end: number}} interval The date interval to convert into a description in natural language
 * @returns {string} Description of the duration in English
 */
export function createNaturalLanguageDuration({ start, end }) {
  const duration = intervalToDuration({ start, end });
  const dateString = formatDuration(duration, {
    format: ["years", "months"],
  });
  return dateString;
}
