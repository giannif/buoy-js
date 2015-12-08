import R from "ramda";
import parseBuoyRecords from "./parse-buoy-records"
export const PARSE_ERROR = "Invalid data for parse-realtime-buoy-data.js";
/**
 * Data loaded from
 * http://www.ndbc.noaa.gov/data/realtime2/{stationID}.txt
 * No json was available
 * returns an {Array} of records of buoy data
 */
export default (list, numberOfRecords = 10) => {
	if (R.is(String, list)) {
		return R.take(numberOfRecords, parseBuoyRecords(list))
	}
	throw PARSE_ERROR;
}
