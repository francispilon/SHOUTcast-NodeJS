var Promise = require('promise');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var DOMParser = require('xmldom').DOMParser;
var developerID;

promise = new Promise(function() {});

// 1.1 Get Top 500 Stations
var getTop500 = function(option){
    var limit = option.limit ? "&limit=" + option.limit : "";
    var br = option.br ? "&br=" + option.br : "";
    var mt = option.mt ? "&mt=" + option.mt : "";

    var url = "http//api.shoutcast.com/legacy/Top500?k=" + developerID
    + limit + br + mt;

    return sendRequest(url);
}

// 1.2 Get Stations by Keyword Search
var getByKeyword = function(keyword, option){
    var limit = option.limit ? "&limit=" + option.limit : "";
    var limitPagination = option.pagination && option.limit ? "," : "";
    var br = option.br ? "&br=" + option.br : "";
    var mt = option.mt ? "&mt=" + option.mt : "";

    var url = "http//api.shoutcast.com/legacy/stationsearch?k=" + developerID
    + limit + pagination + br + mt;

    return sendRequest(url);
}

// 1.3 Get Stations by Genre
var getByGenre = function(genre, option){
    var limit = option.limit ? "&limit=" + option.limit : "";
    var limitPagination = option.pagination && option.limit ? "," : "";
    var br = option.br ? "&br=" + option.br : "";
    var mt = option.mt ? "&mt=" + option.mt : "";

    var url = "http//api.shoutcast.com/legacy/genresearch?k=" + developerID + "&genre=" + genre
    + limit + pagination + br + mt;

    return sendRequest(url);
}

// 1.4 Get Stations Based on Now Playing Info
var getByNowPlaying = function(artist, format, option){
    var limit = option.limit ? "&limit=" + option.limit : "";
    var limitPagination = option.pagination && option.limit ? "," : "";
    var br = option.br ? "&br=" + option.br : "";
    var mt = option.mt ? "&mt=" + option.mt : "";

    var url = "http//api.shoutcast.com/station/nowplaying?k=" + developerID + "&ct=" + 
    artist + "&f=" + format + limit + pagination + br + mt;

    return sendRequest(url);
}

// 1.5 Get Stations by Bitrate or Codec Type or Genre ID
var getByAdvancedSearch = function(option){
    var limit = option.limit ? "&limit=" + option.limit : "";
    var limitPagination = option.pagination && option.limit ? "," : "";
    var br = option.br ? "&br=" + option.br : "";
    var mt = option.mt ? "&mt=" + option.mt : "";
    var genreID = option.genreID ? "&genre_id=" + option.genreID : "";
    var genre = option.genre ? "&br=" + option.br : "";
    var format = option.format ? "&f=" + option.format : "";

    var url = "http//api.shoutcast.com/station/advancedsearch?k=" + developerID
     + limit + format + pagination + br + mt + genreID + genre;

    return sendRequest(url);
}

// 1.6 Get Random Stations
var getRandom = function(option){
    var limit = option.limit ? "&limit=" + option.limit : "";
    var br = option.br ? "&br=" + option.br : "";
    var mt = option.mt ? "&mt=" + option.mt : "";
    var genre = option.genre ? "&br=" + option.br : "";
    var format = option.format ? "&f=" + option.format : "";
    
    var url = "http//api.shoutcast.com/station/stationsearch?k=" + developerID
    + limit + pagination + br + mt;

    return sendRequest(url);
}


var sendRequest = function(url){
    return new Promise(resolve, reject){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(responseText);
            }
            else{
                reject("Could not resolve for " + url + "(Ready State: " + this.readyState + " Status: " + this.status + ")");
            }
        };
    }

    xhttp.open(url, true);
    xhttp.send();
}

var parseUrl = function(url, base, stationID)
{
    return 'http://yp.shoutcast.com' + base + '?id=' + stationID;
}

module.exports =
function(dID) {
    developerID = dID;
    return {
        getTop500: Promise.nodeify(getTop500),
        getByKeyword: Promise.nodeify(getByKeyword),
        getByGenre: Promise.nodeify(getByGenre),
        getByNowPlaying: Promise.nodeify(getByNowPlaying),
        getByAdvancedSearch: Promise.nodeify(getByAdvancedSearch),
        getRandom: Promise.nodeify(getRandom),
        parseURL: Promise.nodeify(parseURL)
    };
};