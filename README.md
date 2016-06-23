[![Build Status](https://img.shields.io/travis/giannif/buoy-js.svg)](https://travis-ci.org/giannif/buoy-js)
[![Coverage Status](https://coveralls.io/repos/giannif/buoy-js/badge.svg?branch=master&service=github)](https://coveralls.io/github/giannif/buoy-js?branch=master)

# buoyjs

### Update: 1.3.7
You can now use .ocean realtime2 data.

Parse data from http://www.ndbc.noaa.gov/ and http://tidesandcurrents.noaa.gov

This project is used to parse data in [Buoy Buddy ![Buoy Buddy](bb.png)](http://appstore.com/buoybuddy), an iOS app showing wave and tide data.

### Buoy Data

Buoy data can be loaded from the latest observation url:
http://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt

And then passed to `Buoy.lastestObservation(rawData)` to get an object of stations and their current conditions.

Or it can be loaded from:
http://www.ndbc.noaa.gov/data/realtime2/{stationID}.txt

OR
http://www.ndbc.noaa.gov/data/realtime2/{stationID}.ocean

And passed to `Buoy.realTime(rawData)` to get a single station an its history of conditions.

### Tide Data

Tide data can be loaded by using:
http://tidesandcurrents.noaa.gov/api/

And then passed to `Tide.parse(rawData)`

This returns a tide object, that can be passed to `Tide.getCurrent(tideObject, forDate)` to return the current tide.

To find the next high or low tide, use `Tide.getNextHighOrLow(tideObject, forDate)`

For both methods, the second argument is Date object, and the default value is now, if left unspecified.

For parsing published Tide Table data, use `Tide.parseTideTable(rawData)`

Tide Tables can be found on pages like:
http://tidesandcurrents.noaa.gov/noaatidepredictions/NOAATidesFacade.jsp?Stationid=8516881
