import { getNaturalLanguageRange } from "./natural-lang-date-range.js";
var startDate = new Date(2016, 6, 22).getTime();
var currentDate = new Date().getTime();
var naturalLanguageString = getNaturalLanguageRange(startDate, currentDate);
document.querySelector("#calculated-range").textContent = naturalLanguageString;