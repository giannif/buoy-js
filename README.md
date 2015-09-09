# buoy-js

Parse data from http://www.ndbc.noaa.gov/ and http://tidesandcurrents.noaa.gov

### Buoy Data

Buoy data can be loaded from the latest observation url:
http://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt

And then passed to `Buoy.lastestObservation(rawData)` to get an object of stations and their current conditions.

Or it can be loaded from:
http://www.ndbc.noaa.gov/data/realtime2/{stationID}.txt

And passed to `Buoy.realTime(rawData)` to get a single station an its history of conditions.

### Tide Data

Tide data can be loaded by using:
http://tidesandcurrents.noaa.gov/api/

And then passed to `Tide.parse(rawData)`

This returns a tide object, that can be passed to `Tide.getCurrent(tideObject, forDate)` to return the current tide. 

To find the next high or low tide, use `Tide.getNextHighOrLow(tideObject, forDate)` 

For both methods, the second argument is Date object, and the default value is now, if left unspecified.

### Tools

The `tools` dir contains some scripts that were used to generate the `dist/buoys.json`. The tools should probably be in a separate project.
