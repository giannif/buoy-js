import _ from "lodash";
import parseBuoyProperties from "./parse-buoy-properties"
import parseLine from "./parse-line"
export const PARSE_ERROR = "Invalid data for parse-data.js";
/**
 * Data loaded from
 * http://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt
 * No json was available
 */
export default function(list) {
	if (_.isString(list)) {
		// create an array from the lines
		list = list.split("\n");
		// get the prop names, and remove STN, which we're using as the ID
		var propertyNames = _.rest(parseLine(_.first(list)));
		// pop off the first two lines of text, they're descriptions, not buoy data
		list = _.compact(list.slice(2));
		var result = {};
		_.each(list, function(row) {
			var record = parseLine(row),
				stationID = record.shift(),
				buoy = result[stationID] = {
					stationID: stationID,
					date: new Date()
				};
			_.each(record, _.partial(parseBuoyProperties, buoy, propertyNames));
			// seconds and milliseconds don't come from noaa data,
			// so clear them
			buoy.date.setSeconds(0)
			buoy.date.setMilliseconds(0)
		});
		return result;
	}
	throw PARSE_ERROR;
}

