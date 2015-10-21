/**
 * Parses station data from http://www.ndbc.noaa.gov/mobile/station.php?station=
 */
let nameMatch = /h1><p>(.*)<br/i,
	coordsMatch = /\d{0,3}\.\d{0,3}(N|S) \d{0,3}.\d{0,3}(W|E)/i,
	idMatch = /title>NDBC\/(.*)<\/title/i
export const PARSE_ERROR = "Couldn't parse station data"
export default function(stationData) {
	let foundID = idMatch.exec(stationData)
	if (!foundID) {
		throw PARSE_ERROR + " no id"
	}
	let id = foundID[1],
		result = {
			id: id
		},
		parse = nameMatch.exec(stationData),
		coords = coordsMatch.exec(stationData)
	if (!parse || parse.length < 2) {
		result.name = id;
	} else {
		result.name = parse[1];
	}
	if (!coords || coords.length < 2) {
		throw PARSE_ERROR + " no coords"
	} else {
		let latlong = coords[0].split(" "),
			lat = latlong[0],
			long = latlong[1]
		result.longitude = long.indexOf("W") === -1 ? parseFloat(long) : -parseFloat(long)
		result.latitude = lat.indexOf("S") === -1 ? parseFloat(lat) : -parseFloat(lat)
	}
	return result
}
