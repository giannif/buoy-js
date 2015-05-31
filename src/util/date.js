function getUTCTimeFromDate(utcDate){
	// you're passing in a utc date,
	// but if it's created with new Date,
	// it might have +GMT offset on it, which will throw it off
	return Date.UTC(utcDate.getFullYear(),
		utcDate.getMonth(),
		utcDate.getDate(),
		utcDate.getHours(),
		utcDate.getMinutes(),
		utcDate.getSeconds()
	)
}
export default {
	getLocalFromUTC: function(utcDate) {
		return new Date(getUTCTimeFromDate(utcDate));
	},
	getUTCTimeFromDate: getUTCTimeFromDate,
	getUTCDate: function(d = new Date()) {
		return new Date(d.getUTCFullYear(),
			d.getUTCMonth(),
			d.getUTCDate(),
			d.getUTCHours(),
			d.getUTCMinutes(),
			d.getUTCSeconds()
		);
	}
}
