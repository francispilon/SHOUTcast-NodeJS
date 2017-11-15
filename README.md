# SHOUTcast-NodeJS
[WIP] SHOUTcast module for node js.

This module is not ready yet, but can be used. Please refer to the API for documentation. API: http://wiki.shoutcast.com/wiki/SHOUTcast_Radio_Directory_API

# Documentation
## How to call on the module
```
var shoutcast = require('shoutcast')([Shoutcast Developer ID])
var reponse = shoutcast.getTop500({limit: '10', br: '320', mt: 'audio/mpeg'})
```

### Further documentation will be provided once the module is completed. Please refer to the API document above.

# Progression
## TODO
* Get All Genres
* Get Primary Genres
* Get Secondary Genres
* Get Genres Details by Passing Genreid
* Get Genres Based on Availability of Sub-Genres
* Function Documentation

## DONE

* Get Top 500 Stations
* Get Stations by Keyword Search
* Get Stations by Genre
* Get Stations Based on Now Playing Info
* Get Stations by Bitrate or Codec Type or Genre ID
* Get Random Stations
