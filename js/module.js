import { getNaturalLanguageRange } from "./natural-lang-date-range.js";

const startDate = new Date(2016, 6, 22).getTime();
const currentDate = new Date().getTime();
const naturalLanguageString = getNaturalLanguageRange(startDate, currentDate);

document.querySelector("#calculated-range").textContent = naturalLanguageString;
