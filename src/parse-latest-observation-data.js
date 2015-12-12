import R from "ramda";
import parseBuoyRecords from "./parse-buoy-records"
export const PARSE_ERROR = "Invalid data for parse-data.js";

/**
 * Data loaded from
 * http://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt
 * No json was available
 */
export default R.ifElse(
	R.is(String),
	parseBuoyRecords,
	function() {
		throw PARSE_ERROR
	}
)
