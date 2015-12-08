import R from "ramda";
import util from "./util/func-util"
import getNOAADate from "./util/get-noaa-date";
let createTideObj = fields => {
		// fields: Date, Day, Time, Ft, cm, High/Low
		if (fields.length === 6) {
			let date = new Date(fields[0] + " " + fields[2] + " GMT+0000")
			if (util.isDate(date)) {
				return {
					date: date,
					tideSize: parseInt(fields[4]) / 100,
					isHighTide: fields[5].indexOf("H") !== -1
				}
			}
		}
	},
	parseTideTableLineToObject = R.ifElse(
		R.is(String),
		R.pipe(
			// create array
			R.split("\t"),
			// remove empties
			util.compact,
			// create tide object
			createTideObj),
		R.identity),
	parseTideTable = R.pipe(
		// create array
		R.split("\n"),
		// map to tide objects
		R.map(parseTideTableLineToObject),
		// clean up
		util.compact),
	parseTideData = R.pipe(
		// split newlines
		R.split("\n"),
		// ignore the first
		R.tail),
	parseTideItem = R.pipe(
		R.split(","),
		tide => ({
				// the date is UTC, append GMT+0000 to indicate that
				date: new Date(tide[0].replace(/-/g, "/") + " GMT+0000"),
				tideSize: parseFloat(tide[1])
		}))

export default {
	/**
	 * return an array of {date, tideSize, isHighTide}
	 */
	getURL: (tideStationID, numberOfHours = 48) => {
		var range = numberOfHours;
		return `http://tidesandcurrents.noaa.gov/api/datagetter?begin_date=${getNOAADate()}&range=${range}&station=${tideStationID}&product=predictions&datum=MLLW&units=metric&time_zone=gmt&application=ports_screen&format=csv`;
	},
	parseTideTableLine: parseTideTableLineToObject,
	/**
	 * return an array of {date, tideSize, isHighTide}
	 */
	parseTideTable: R.ifElse(
		R.is(String),
		parseTideTable,
		R.identity
	),
	/**
	 * return an array of {date, tideSize}
	 */
	parse: R.pipe(
		parseTideData,
		R.map(parseTideItem)
	),
	/**
	 * look through an array of {date, tideSize}
	 */
	getCurrent: (data, forDate) => {
		let matchDate = forDate || new Date(),
			lastTide = {};
		return R.find(tide => {
			let date = tide.date
			if (util.isDate(date)) {
				if (date.getTime() > matchDate.getTime()) {
					tide.isIncreasing = tide.tideSize > lastTide.tideSize;
					return true;
				}
				if (tide.tideSize !== lastTide.tideSize) {
					lastTide = tide;
				}
			}
		}, data);
	},
	/**
	 * look through an array of {date, tideSize}
	 */
	getNextHighOrLow: (data, forDate) => {
		let matchDate = forDate || new Date(),
			foundCurrent,
			isIncreasing,
			result,
			lastTide = {};
		data.some(tide => {
			var itemDate = new Date(tide.date);
			if (!util.isDate(itemDate)) {
				return false;
			}
			if (foundCurrent) {
				// the tide is increasing
				// the current item is lower than the last
				// the last item was the high tide
				if (isIncreasing && tide.tideSize < lastTide.tideSize) {
					result = lastTide;
				} else if (!isIncreasing && tide.tideSize > lastTide.tideSize) {
					// tide is decreasing
					// the current tide is higher than the last
					// the last item was low tide
					result = lastTide;
				}
				if (result) {
					lastTide.isHighTide = isIncreasing;
					return true;
				}
			}
			if (!foundCurrent && itemDate.getTime() > matchDate.getTime()) {
				// we found the current tide, is it increasing?
				isIncreasing = tide.tideSize > lastTide.tideSize;
				foundCurrent = true;
			}
			if (tide.tideSize !== lastTide.tideSize) {
				lastTide = tide;
			}
		});
		return result;
	}
}
