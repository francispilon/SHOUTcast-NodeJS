var Promise = require('promise');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var DOMParser = require('xmldom').DOMParser;

var developerID;
var searchType = {
    GENRE: {
        path: 'genresearch',
        query: 'genre',
        option: ''
    },
    SEARCH: {
        path: 'stationsearch',
        query: 'search',
        option: ''
    },
    INFO: {
        path: 'nowplaying',
        query: 'ct',
        option: '&f=xml'
    },
    BITRATE: {
        path: 'advancedsearch',
        query: 'br',
        option: '&f=xml'
    },
    MEDIA: {
        path: 'advancedsearch',
        query: 'mt',
        option: '&f=xml'
    },
    GENREID: {
        path: 'advancedsearch',
        query: 'genre_id',
        option: '&f=xml'
    }
}

promise = new Promise(function() {});

var searchStationsXML = function(keyword, type, limit) {
    return new Promise(function(resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                parser = new DOMParser();
                resolve(parser.parseFromString(this.responseText));
            }
        };
        xhttp.open("GET", "http://api.shoutcast.com/legacy/" + type.path + "?k=" + developerID +
            "&" + type.query + "=" + keyword + "&limit=" + limit + type.option, true);
        xhttp.send();
    });
}


var getSingleStation = function(keyword) {
    return new Promise(function(resolve, reject) {
        searchStationsXML(keyword, searchType.SEARCH, 1).then(function(response) {
            return resolve(response);
        });
    });
}

var getURL = function(keyword) {
    return new Promise(function(resolve, reject) {
        getSingleStation(keyword).then(function(response) {
                var base = response.getElementsByTagName("tunein")[0].getAttribute('base');
                var stationID = response.getElementsByTagName("station")[0].getAttribute('id');
                var name = response.getElementsByTagName('station')[0].getAttribute('name');
                return resolve({stationName: name, url: 'http://yp.shoutcast.com' + base + '?id=' + stationID});
        });
    });
}

module.exports =
    function(dID) {
        developerID = dID;
        return {
            searchType: searchType,
            get: Promise.nodeify(getSingleStation),
            searchStations: Promise.nodeify(searchStationsXML),
            tuneIn: Promise.nodeify(getURL)
        };
    };