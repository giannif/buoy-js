import parseLatestObservationData from "./parse-latest-observation-data";
import parseBuoy from "./parse-realtime-buoy-data";
import Tide from "./tide";
export default {
	build: "@@compiled",
	Tide: Tide,
	Buoy: {
		realTime: parseBuoy,
		lastestObservation: parseLatestObservationData
	}
};
