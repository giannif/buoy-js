/*eslint-disable no-console */
import parseData from "../parse-latest-observation-data.js";
import getClosestTideStation from "../closest-tide-station.js";
import fs from "fs";
import request from "request";
import buoyData from "../data/buoys"
import _ from "lodash";
const MAX_DISTANCE = 50000; // 50 km
request("http://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt", function(err, data) {
	if (err) {
		console.error(err);
	} else {
		let buoys = parseData(data.body);
		console.log("check ", _.keys(buoys).length, "buoys");
		_.each(buoys, function(buoy) {
			let closestStation = getClosestTideStation(buoy.latitude, buoy.longitude);
			if(closestStation.distance < MAX_DISTANCE){
				console.log("\n\n>", buoy.stationID, "id:", closestStation.id, "dist", closestStation.distance);
				// console.log("closest tide station:", closestStation);
				let buoyStation = buoyData[buoy.stationID];
				if(buoyStation){
					buoyStation.tideStation = closestStation;
				}else{
					console.warn("no buoy data in buoy.json for " + buoy.stationID);
				}
			}
		});
		data = JSON.stringify(buoyData, null, 2);
		fs.writeFileSync("./src/data/buoy-with-tide-station.json", data);
	}
});
