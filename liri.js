require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);

function mapArtists (artist) {
    return artist.name;
};

var songTitle = ""
function spotifyThisSong(songTitle) {
    if (!songTitle) { songTitle = 'revolution'}

    console.log("Searching Spotify for: " + songTitle);
    
    spotify.search({ type: 'track', query: songTitle, limit: "10" }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var song = data.tracks.items;
        for (var i=0; i < data.tracks.items.length; i++) {
            result = i + 1;
            console.log("\nResult #" + result + " --------------------------------------")
            console.log("Artist(s): " + song[i].artists.map(mapArtists));
            console.log("Song Title: " + song[i].album.name);
            console.log("can be found on the album: " + song[i].name + " | track number: " + song[i].track_number);
            console.log("URL to preview the song on Spotify: " + song[i].preview_url);
            
            // console.log(JSON.stringify(song[i], null, 3));

        };

        if (data.tracks.total === 0) { console.log("\n Sorry, Spotify did not find any songs with " + songTitle + " in the title.\n"); };
    
});

} 

function movieThis (movieTitle) {
    if (!movieTitle) {
        movieTitle = 'mr.+nobody';
    } else {
        movieTitle =movieTitle.replace(/ /g, '+');
    }
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
            console.log(JSON.stringify(response.data, null, 3));
        //   console.log("Release Year: " + response.data.Year);
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
      
}

function concertThis (artistName) {
    if (!artistName) {
        artistName = 'fleetwood%20mac';
    } else {
        artistName =artistName.replace(/ /g, '%20');
    }
    
    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function(response) {
            console.log(JSON.stringify(response.data, null, 3));
        //   console.log("Release Year: " + response.data.Year);
        });
    };

var action = process.argv[2];
var target = process.argv.slice(3).join(" ");

switch (action) {

    case "concert-this" :
        console.log ("action: " + action + " | target: " + target);
        break;
        
    case "spotify-this-song" :
        spotifyThisSong(target);
        break;

    case "movie-this" :
        movieThis(target);
        break;

    case "do-what-it-says" :
        console.log ("action: " + action + " | target: " + target);
        break;
        
    default :
        console.log('Ooops, please put in something for me to do');

    var currentDate = moment();
    console.log(currentDate.format("MMMM Do, YYYY HH:mm"))
    datetime = "2019-06-05T19:00:19"
    datetime = datetime.replace(/T/, ' ');
    // datetime = datetime.replace(/-/g, "/");
    console.log(datetime);
    var convertedTime = moment(datetime, "YYYY-MM-DD HH:mm:ss")
    console.log(convertedTime.format("dddd, MMMM Do, YYYY h:mm A"))
        break;
    }
