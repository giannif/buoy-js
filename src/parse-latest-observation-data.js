import _ from "lodash";
// import stationNames from "./data/buoy-names.json"
import degreesToDirection from "./degrees-to-direction"
import propMap from "./prop-map.js"
function getArrayFromLine(line) {
	return line.replace(/\s{2,}/g, ' ').replace("#", "").split(" ");
}
export default function(list) {
	// console.log("Parse Buoy Data");
	if (_.isString(list)) {
		// create an array of lines
		list = list.split("\n");
		// get the prop names, and remove STN, which we're using as the ID
		var map = _.rest(getArrayFromLine(_.first(list)));
		// pop off the first two lines of text, they're descriptions, not buoy data
		list = list.slice(2);
		// console.log("Parse Buoy Data, stations:", list.length);
		// remove the last one, if it's empty
		if (_.isEmpty(_.last(list))) {
			list.pop();
		}
		var result = {};
		// console.log("parse-data.js:80 stationNames", stationNames);
		_.each(list, function(row) {
			var data = getArrayFromLine(row),
				stationID = data.shift(),
				buoy = result[stationID] = {
					stationID: stationID
				},
				date = buoy.date = new Date();
			// buoy.label = stationNames[stationID];
			_.each(data, function(val, index) {
				if (val === "MM") {
					return;
				}
				var propName = map[index];
				if (propMap[propName]) {
					propName = propMap[propName];
				} else {
					return;
				}
				// all values are numbers.
				val = parseFloat(val);
				switch (propName) {
					case "year":
						date.setYear(val);
						break;
					case "month":
						date.setMonth(val - 1);
						break;
					case "day":
						date.setDate(val);
						break;
					case "hour":
						date.setHours(val);
						break;
					case "minute":
						date.setMinutes(val - date.getTimezoneOffset());
						break;
					case "dominantPeriodWaveDirection":
						buoy[propName] = val;
						buoy.dominantPeriodWaveDirectionCompass = degreesToDirection(val);
						break;
					case "windDirection":
						buoy[propName] = val;
						buoy.windDirectionCompass = degreesToDirection(val);
						break;
					case "waveHeight":
						buoy[propName] = val;
						buoy[propName + "Feet"] = parseInt(val * 30.28084) / 10;
						break;
					case "longitude":
					case "latitude":
						buoy[propName] = parseFloat(val);
						break;
					default:
						if(!_.isUndefined(val)){
							buoy[propName] = val;
						}
						break;
				}
			});
		});
		return result;
	} else {
		throw "Invalid data for parse-data.js";
	}
};
