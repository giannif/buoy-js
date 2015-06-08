import parseLatestObservationData from "./parse-latest-observation-data";
import parseBuoy from "./parse-realtime-buoy-data";
import Tide from "./tide";
import buoys from "./data/buoys.json"
export default {
	build: "@@compiled",
	stations: buoys,
	Tide: Tide,
	Buoy: {
		realTime: parseBuoy,
		lastestObservation: parseLatestObservationData
	}
};
