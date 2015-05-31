	/*eslint-disable no-console*/
import _ from "lodash";
function getElapsed(date1, date2){
	return Math.abs(date2.getTime() - date1.getTime()) / 1000;
}
function shouldInsertHistory(buoy1, buoy2){
	if(!_.isEqual(_.omit(buoy1, "date"), _.omit(buoy2, "date"))){
		return true;
	}
	let elapsed = getElapsed(buoy1.date, buoy2.date);
	// same entry
	if(elapsed === 0){
		return false;
	}
	// it's been an hour, perhaps the data is the same
	if(elapsed > 60){
		return true;
	}
}
export default {
	save: function(newBuoyData, buoyHistory = {}) {
		var stationID = newBuoyData.stationID,
			history = buoyHistory[stationID];
		if(!history){
			// create new data structure
			history = buoyHistory[stationID] = [newBuoyData];
		}else if(shouldInsertHistory(_.last(history), newBuoyData)){
			history.push(newBuoyData);
			// limit it to 20 entries
			if(history.length > 20){
				history.shift();
			}
		}
		return history;
	},
	recent: function() {}
}
