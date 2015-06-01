import _ from "lodash";
import degreesToDirection from "./degrees-to-direction"
import dateUtil from "./util/date"
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
		var map = getArrayFromLine(_.first(list));
		// pop off the first two lines of text, they're descriptions, not buoy data
		list = list.slice(2);
		// console.log("Parse Buoy Data, stations:", list.length);
		// remove the last one, if it's empty
		if (_.isEmpty(_.last(list))) {
			list.pop();
		}
		var items = [];
		_.each(_.take(list, 10), function(row) {
			var data = getArrayFromLine(row),
				item = {},
				date = item.date = new Date();
			// iterate through each prop
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
						date.setMinutes(val);
						break;
					case "dominantPeriodWaveDirection":
						item[propName] = val;
						item.dominantPeriodWaveDirectionCompass = degreesToDirection(val);
						break;
					case "windDirection":
						item[propName] = val;
						item.windDirectionCompass = degreesToDirection(val);
						break;
					case "waveHeight":
						item[propName] = val;
						item[propName + "Feet"] = parseInt(val * 30.28084) / 10;
						break;
					case "longitude":
						item[propName] = parseFloat(val);
						break;
					case "latitude":
						item[propName] = parseFloat(val);
						break;
					default:
						if(!_.isUndefined(val)){
							item[propName] = val;
						}
						break;
				}
			});
			// we just want UTC time in seconds for importing into iOS JSContext
			// tried to reconcile but iOS ignores the GMT value
			item.date = dateUtil.getUTCTimeFromDate(item.date);
			// add the item
			items.push(item);
		});
		return items;
	} else {
		throw "Invalid data for parse-data.js";
	}
}
