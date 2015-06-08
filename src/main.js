import parseLatestObservationData from "./parse-latest-observation-data";
import parseBuoy from "./parse-realtime-buoy-data";
import Tide from "./parse-tide";
import getNOAADate from "./util/get-noaa-date";
import buoyData from "./data/buoys.json"
export default {
	build: "@@compiled",
	Tide: Tide,
	buoys: buoyData,
	parseLatestObservationData: parseLatestObservationData,
	parseBuoy: parseBuoy,
	getStationName(stationID){
		return buoyData[stationID].name;
	},
	getTideURL(tideStationID, numberOfHours = 48){
		var range = numberOfHours;
		return `http://tidesandcurrents.noaa.gov/api/datagetter?begin_date=${getNOAADate()}&range=${range}&station=${tideStationID}&product=predictions&datum=MLLW&units=metric&time_zone=gmt&application=ports_screen&format=csv`;
	},
	parseTideData(tideData){
		return Tide.parse(tideData);
	},
	getCurrentTide(tideData){
		return Tide.getCurrent(tideData);
	},
	getNextHighOrLowTide(tideData){
		return Tide.getNextHighOrLow(tideData);
	}
};
