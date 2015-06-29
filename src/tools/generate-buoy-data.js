/*eslint-disable no-console */
import parseData from "../parse-latest-observation-data";
import existingData from "../data/buoys";
import {argv} from "yargs"
import request from "request";
import getClosestTideStation from "../util/closest-tide-station.js";
import _ from "lodash";
import fs from "fs";
const MAX_DISTANCE_FOR_TIDE_STATION = 50000; // 50 km
// If a buoy station has these abilities, store them in the abilities property.
let abilities = [
	"windDirection",
	"windSpeed",
	"gustSpeed",
	"waveHeight",
	"wavePeriod",
	"averageWavePeriod",
	"dominantPeriodWaveDirection",
	"pressure",
	"airTemp",
	"waterTemp",
	"dewpointTemp",
	"pressureTendency"
],
	// we want to augment the existing data, or start fresh if --clean was passed
	result = argv.clean ? {} : existingData || {}

function done() {
	console.log("Done. Saving " + _.keys(result).length + " buoys");
	fs.writeFileSync("./src/data/buoys.json", JSON.stringify(result, null, 2));
}
/**
 * For each buoy listed in latest_obs.txt,
 * create an object and store the buoy's latitude and longitude
 * find its closest tide station
 * store its abilities
 * then also find its name from the mobile site for station.php,
 * which is used because it was just easy to parse with regex
 */
request("http://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt", function(err, data) {
	if (err) {
		console.error("Error loading latest_obs", err);
	} else {
		_.each(parseData(data.body), function(buoy, key) {
			// only include buoys that have wave height
			if(!isNaN(buoy.waveHeight)){
				var buoyResult = result[key] = _.defaults({
					longitude: buoy.longitude,
					latitude: buoy.latitude,
					abilities: _.intersection(_.keys(buoy), abilities)
				}, result[key])
				// Store Tide Station
				if(!buoyResult.tideStation){
					let closestStation = getClosestTideStation(buoy.latitude, buoy.longitude);
					if(closestStation.distance < MAX_DISTANCE_FOR_TIDE_STATION){
						buoyResult.tideStation = closestStation;
					}
				}
			}else{
				delete result[key]
			}
		})
		let namelessBuoys = _.omit(result, function(value, key) {
			// omit if it has a name already
			// and the name is not equal to the key
			return _.isString(value.name) && value.name !== key;
		}),
			finish = _.after(_.keys(namelessBuoys).length, done),
			match = /h1><p>(.*)<br/i;
		console.log("get buoy names for " +  _.keys(namelessBuoys).length + " buoys");
		_.each(namelessBuoys, function(buoy, key) {
			request("http://www.ndbc.noaa.gov/mobile/station.php?station=" + key, function(stationErr, stationData) {
				if (err) {
					console.error("Error loading station " + key, err);
				} else {
					let parse = match.exec(stationData.body);
					// if there's no match, use this temporary default string
					if (!parse || parse.length < 2) {
						buoy.name = key;
					}else{
						buoy.name = parse[1];
					}
					// console.log("Updated data for key:", buoy);
					finish();
				}
			});
		});
	}
});
