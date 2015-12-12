import R from "ramda";
import util from "./util/func-util"
import parseBuoyProperties from "./parse-buoy-properties"
let arrayFromLine = line => line.replace(/\s{2,}/g, ' ').replace("#", "").split(" "),
	// get the prop names from first element in the array
	headAsArray = R.pipe(R.head, arrayFromLine),
	// pop off the first two lines of text, they're descriptions, not buoy data
	cleanBuoyData = R.pipe(R.drop(2), util.compact),
	// Convert the raw data to a buoy object
	createBuoyRecord = R.curry((propertyNames, values) => {
		var buoy = {
			// this date will be manipulated in parseBuoyProperties
			date: new Date()
		};
		// build the object by iterating through each row value
		values.forEach(R.partial(parseBuoyProperties, [buoy, propertyNames]));
		// seconds and milliseconds don't come from noaa data,
		// so clear them
		buoy.date.setSeconds(0)
		buoy.date.setMilliseconds(0)
		return buoy;
	}),
	// Run the functions defined above
	parseBuoyRecords = records => {
		// The first line contains the property names
		let propertyNames = headAsArray(records),
			// Run this on each record
			parseRecord = R.compose(createBuoyRecord(propertyNames), arrayFromLine),
			// The records we want to map
			recordsList = cleanBuoyData(records)
		return recordsList.map(parseRecord);
	}

export default R.pipe(R.split("\n"), parseBuoyRecords)
