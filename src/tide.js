import _ from "lodash";
import toFeet from "./util/meters-to-feet";
import getNOAADate from "./util/get-noaa-date";

export default {
	getURL(tideStationID, numberOfHours = 48){
		var range = numberOfHours;
		return `http://tidesandcurrents.noaa.gov/api/datagetter?begin_date=${getNOAADate()}&range=${range}&station=${tideStationID}&product=predictions&datum=MLLW&units=metric&time_zone=gmt&application=ports_screen&format=csv`;
	},
	/**
	 * return an array of {date, size}
	 */
	parse: function(rawData) {
		return _.rest(rawData.split("\n")).map(function(row) {
			var tide = row.split(","),
				// the date is UTC, append GMT+0000 to indicate that
				formattedTime = tide[0].replace(/-/g, "/") + " GMT+0000";
			return {
				date: new Date(formattedTime),
				tideSize: parseFloat(tide[1])
			};
		});
	},
	/**
	 * look through an array of {date, tideSize}
	 */
	getCurrent: function(data, forDate) {
		let matchDate = forDate || new Date(),
			lastTide = {};
		return _.find(data, function(tide) {
			if(!tide.date){
				return false;
			}
			if (tide.date.getTime() > matchDate.getTime()) {
				tide.isIncreasing = tide.tideSize > lastTide.tideSize;
				tide.tideSizeFeet = toFeet(tide.tideSize);
				return true;
			}
			if (tide.tide !== lastTide.tide) {
				lastTide = tide;
			}
		});
	},
	/**
	 * look through an array of {date, tideSize}
	 */
	getNextHighOrLow: function(data, forDate) {
		let matchDate = forDate || new Date(),
			foundCurrent,
			isIncreasing,
			result,
			lastTide = {};
		_.some(data, function(tide) {
			var itemDate = new Date(tide.date);
			if(!itemDate){
				return false;
			}
			if(foundCurrent){
				// the tide is increasing
				// the current item is lower than the last
				// the last item was the high tide
				if(isIncreasing && tide.tideSize < lastTide.tideSize){
					result = lastTide;
				}else if(!isIncreasing && tide.tideSize > lastTide.tideSize){
					// tide is decreasing
					// the current tide is higher than the last
					// the last item was low tide
					result = lastTide;
				}
				if(result){
					lastTide.isHighTide = isIncreasing;
					lastTide.tideSizeFeet = toFeet(lastTide.tideSize);
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
