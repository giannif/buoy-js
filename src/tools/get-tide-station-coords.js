/**
 * I didn't need need this since I copied the website data.
 */
/*eslint-disable no-console */
import stations from "./all-tide-stations";
import _ from "lodash";
import fs from "fs";
import request from "request";
let missingData = [],
	numberOfStations = stations.stations.length;
console.log("stations to process:", numberOfStations);
let done = _.after(numberOfStations, function() {
	let data = JSON.stringify(stations, null, 2);
	fs.writeFileSync("./js-tools/all-tide-stations.json", data);
	console.log("Missing:", missingData.length);
	stations.stations = _.filter(stations.stations, function(station) {
		return !_.isUndefined(station.latitude)
	});
	data = JSON.stringify(stations, null, 2);
	fs.writeFileSync("./src/filtered-tide-stations.json", data);
});

function loadStation(station) {
		if (!_.isUndefined(station.latitude)) {
			done();
		} else {
			let id = station.id,
				url = `http://tidesandcurrents.noaa.gov/api/datagetter?date=today&station=${id}&product=air_temperature&units=metric&time_zone=lst_ldt&application=ports_screen&format=json`;
			request(url, function(err, data) {
				var json = data.body;
				if (_.isString(json)) {
					json = JSON.parse(json);
				}
				var metadata = json.metadata;
				if (metadata) {
					station.latitude = Math.abs(metadata.lat);
					station.longitude = Math.abs(metadata.lon);
				} else {
					missingData.push(station);
				}
				done();
			});
		}
	}
	// loadStation({id: "9410170", name: "test"});
stations.stations.forEach(loadStation);
