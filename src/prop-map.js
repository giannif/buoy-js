export default {
	STN: "stationID",
	/**
	 * Wind direction (the direction the wind is coming from in degrees clockwise from true N) during the same period used for WSPD. See Wind Averaging Methods
	 */
	WDIR: "windDirection",
	/**
	 * Wind speed (m/s) averaged over an eight-minute period for buoys and a two-minute period for land stations. Reported Hourly. See Wind Averaging Methods.
	 */
	WSPD: "windSpeed",
	/**
	 * Peak 5 or 8 second gust speed (m/s) measured during the eight-minute or two-minute period. The 5 or 8 second period can be determined by payload, See the Sensor Reporting, Sampling, and Accuracy section.
	 */
	GST: "gustSpeed",
	/**
	 * Significant wave height (meters) is calculated as the average of the highest one-third of all of the wave heights during the 20-minute sampling period. See the Wave Measurements section.
	 */
	WVHT: "waveHeight",
	/**
	 * Dominant wave period (seconds) is the period with the maximum wave energy. See the Wave Measurements section.
	 */
	DPD: "wavePeriod",
	/**
	 * Average wave period (seconds) of all waves during the 20-minute period. See the Wave Measurements section.
	 */
	APD: "averageWavePeriod",
	/**
	 * The direction from which the waves at the dominant period (DPD) are coming. The units are degrees from true North, increasing clockwise,
	 * with North as 0 (zero) degrees and East as 90 degrees. See the Wave Measurements section.
	 */
	MWD: "dominantPeriodWaveDirection",
	/**
	 * Sea level pressure (hPa). For C-MAN sites and Great Lakes buoys,
	 * the recorded pressure is reduced to sea level using the method described in
	 * NWS Technical Procedures Bulletin 291 (11/14/80). ( labeled BAR in Historical files)
	 */
	PRES: "pressure",
	/**
	 * Air temperature (Celsius). For sensor heights on buoys, see Hull Descriptions.
	 * For sensor heights at C-MAN stations, see C-MAN Sensor Locations
	 */
	ATMP: "airTemp",
	/**
	 * Sea surface temperature (Celsius). For sensor depth, see Hull Description.
	 */
	WTMP: "waterTemp",
	/**
	 * Dewpoint temperature taken at the same height as the air temperature measurement.
	 */
	DEWP: "dewpointTemp",
	/**
	 * Pressure Tendency is the direction (plus or minus) and the amount of pressure change (hPa)
	 * for a three hour period ending at the time of observation. (not in Historical files)
	 */
	PTDY: "pressureTendency",
	TIDE: "tide",
	LAT: "latitude",
	LON: "longitude",
	YYYY: "year",
	YY: "year",
	MM: "month",
	DD: "day",
	hh: "hour",
	mm: "minute"
}
