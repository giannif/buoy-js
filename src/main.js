import parseLatestObservationData from "./parse-latest-observation-data";
import parseBuoy from "./parse-buoy";
import Tide from "./parse-tide";
import buoyTideStationMap from "./data/buoy-tide-station-map";
import getNOAADate from "./util/get-noaa-date";
import buoyData from "./data/buoys.json"
export default {
	build: "@@compiled",
	Tide: Tide,
	buoys: buoyData,
	parseLatestObservationData: parseLatestObservationData,
	parseBuoy: parseBuoy,
	getStations(){
		return buoyData
	},
	getStationName(stationID){
		return buoyData[stationID].name;
	},
	getTideURL(stationID, numberOfHours = 48){
		var tideStation = buoyTideStationMap[stationID],
			range = numberOfHours;
		if(!tideStation){
			return null;
		}
		return `http://tidesandcurrents.noaa.gov/api/datagetter?begin_date=${getNOAADate()}&range=${range}&station=${tideStation.id}&product=predictions&datum=MLLW&units=metric&time_zone=gmt&application=ports_screen&format=csv`;
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
