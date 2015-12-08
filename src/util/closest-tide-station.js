import geolib from "geolib";
import R from "ramda";
import stations from "../../src/data/tide-stations";
export default (latitude, longitude) => {
	var shortest = Infinity,
		result;
	R.forEach(station => {
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
			result = R.clone(station);
			result.distance = distance;
		}
	}, stations);
	return result;
}
