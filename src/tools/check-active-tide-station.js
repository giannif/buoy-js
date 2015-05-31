/*eslint-disable no-console */
import request from "request";
import getNOAADate from "../util/get-noaa-date";
import parseTide from "../parse-tide";
import {expect} from "chai";
import {stations} from "../data/tide-stations";
/**
 * WIP
 * The goal of this is to make sure that all the buoy's closest
 * tide stations actually return data.
 */
function getStation(station) {
	let id = station.id,
		template = `http://tidesandcurrents.noaa.gov/api/datagetter?begin_date=${getNOAADate()}&range=100&station=${id}&product=predictions&datum=MLLW&units=metric&time_zone=gmt&application=ports_screen&format=csv`;
	console.log("check-active-tide-station.js:10 template", template);
	request(template, function(err, data){
		if(err){
			console.error(id, err);
		}
		var tide = parseTide(data.body);
		expect(tide).to.be.an("object");
		console.log(station.id, "tide:", tide);
	});
}
// getStation(stations[0]);
stations.forEach(getStation);
