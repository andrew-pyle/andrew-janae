const MONTHS_IN_YEAR = 12
const MILLISECS_IN_YEAR = 1000 * 60 * 60 * 24 * 365
const DATE_MARRIED = new Date(2016, 6, 22)
const currentDate = new Date()

const differenceInMillisecs = currentDate - DATE_MARRIED
const differenceInYears = differenceInMillisecs / MILLISECS_IN_YEAR

const yearsSinceWedding = Math.floor(differenceInYears)
const monthsRemainderDecimal = differenceInYears - yearsSinceWedding
const monthsRemainderInteger = Math.round(MONTHS_IN_YEAR * monthsRemainderDecimal)

const roundedYearsSinceWedding = monthsRemainderInteger < 12 ? yearsSinceWedding : yearsSinceWedding + 1
const roundedMonthsRemainderInteger = monthsRemainderInteger < 12 ? monthsRemainderInteger : null

const naturalLanguageString = `${roundedYearsSinceWedding} years` + (roundedMonthsRemainderInteger ? ` & ${roundedMonthsRemainderInteger} months` : "")

console.log(roundedYearsSinceWedding, roundedMonthsRemainderInteger)

const calculatedRange = document.querySelector('#calculated-range')
calculatedRange.textContent = naturalLanguageString