import R from "ramda";

let compact = R.pipe(R.reject(R.isNil), R.filter(Boolean)),
	checkFinite = obj => isFinite(obj) && !isNaN(parseFloat(obj)),
	isDate = date => R.is(Date, date) && checkFinite(date.getTime())

export default {
	compact: compact,
	isDate: isDate
}
