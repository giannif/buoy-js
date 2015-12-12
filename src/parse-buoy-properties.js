import degreesToDirection from "./util/degrees-to-direction"
import propMap from "./prop-map.js"
export default (buoy, map, val, index) => {
	if (val === "MM") {
		return;
	}
	let propName = map[index];
	if (propName === "STN") {
		buoy.stationID = val
		return
	}
	if (propMap[propName]) {
		propName = propMap[propName];
	} else {
		return;
	}
	// all values are numbers.
	val = parseFloat(val);
	switch (propName) {
		case "year":
			buoy.date.setUTCFullYear(val);
			break;
		case "month":
			buoy.date.setUTCMonth(val - 1);
			break;
		case "day":
			buoy.date.setUTCDate(val);
			break;
		case "hour":
			buoy.date.setUTCHours(val);
			break;
		case "minute":
			buoy.date.setUTCMinutes(val);
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
			break;
		case "longitude":
		case "latitude":
			buoy[propName] = parseFloat(val);
			break;
		default:
			buoy[propName] = val;
			break;
	}
}
