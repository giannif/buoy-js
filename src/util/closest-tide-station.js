import geolib from "geolib";
import _ from "lodash";
import {stations} from "../../src/data/tide-stations";
export default function(latitude, longitude) {
	var shortest = Infinity,
		result;
	_.each(stations, function(station) {
		var distance = geolib.getDistance({
			latitude,
			longitude
		}, {
			latitude: station.latitude,
			longitude: station.longitude
		});
		if (distance < shortest) {
			shortest = distance;
			// we don't want to change the original data source.
			result = _.clone(station);
			result.distance = distance;
		}
	});
	return result;
}
