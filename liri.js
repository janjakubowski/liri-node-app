require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);

// //////////////////////////////////////////////////////////////
// Mapping functions

function mapArtists (artist) {
    return artist.name;
};

function mapLineup (lineup) {
    return lineup;
}

function mapRatings (ratings) {
    return ratings.Source + ": " + ratings.Value;
};

// ///////////////////////////////////////////////////////////////
// s p o t i f y T h i s S o n g function
//
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
            console.log("Song Title: " + song[i].name);
            console.log("can be found on the album: " + song[i].album.name + " | track number: " + song[i].track_number);
            console.log("URL to preview the song on Spotify: " + song[i].preview_url);
        };
        
        if (data.tracks.total === 0) { console.log("\n Sorry, Spotify did not find any songs with " + songTitle + " in the title.\n"); };
    });
} 

// ///////////////////////////////////////////////////////////////
// m o v i e T h i s  function
//
function movieThis (movieTitle) {
    
    if (!movieTitle) {
        movieTitle = "Dr. Strangelove";
    }
    
    console.log("Searching OMDB for: " + movieTitle + "\n");
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
            // console.log(JSON.stringify(response.data, null, 3));
            console.log("Title: " + response.data.Title);
            console.log("Rated: " + response.data.Rated);
            console.log("Released: " + response.data.Released);
            
            console.log("Reviews: " + response.data.Ratings.map(mapRatings));
            console.log("Produced in: " + response.data.Country);
            console.log("Language(s): " + response.data.Language);
            console.log("Starring: " + response.data.Actors);
            console.log("Plot: " + response.data.Plot);
        })
        .catch(function(error) {
            
            if (error.response) {
                // Responded with a status code that falls out of the range of 2xx
                console.log("*** Data: " + error.response.data + " ***");
                console.log("*** Status: " + error.response.status + " ***");
                console.log("*** Headers: " + error.response.headers + " ***");
                
            } else if (error.request) {
                // No response was received, log object with error details
                console.log(error.request);
                
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
        
    }
    
// ///////////////////////////////////////////////////////////////
// c o n c e r t T h i s  function
//
function concertThis (artistName) {
    
    if (!artistName) {
        artistName = "Fleetwood Mac";
    } 
    
    console.log("Searching Bands-In-Town for " + artistName + "\n");
    
    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function(response) {
            
            var concerts = response.data;
            console.log(concerts.length + " results found")

            for (var i=0; i < concerts.length; i++) {
                result = i + 1;
                console.log("\nResult #" + result + " --------------------------------------")
                console.log("Lineup: " + concerts[i].lineup.map(mapLineup));
                console.log("Venue: " + concerts[i].venue.name);
                console.log("Located in " + concerts[i].venue.city + " " + concerts[i].venue.region + " " + concerts[i].venue.country)
                datetime = concerts[i].datetime;
                datetime = datetime.replace(/T/, ' ');
                var convertedTime = moment(datetime, "YYYY-MM-DD HH:mm:ss")
                console.log("On " + convertedTime.format("dddd, MMMM Do, YYYY h:mm A"))
            };
            
            if (response.length === 0) { console.log("\n Sorry, Bands In Town did not find any songs with " + songTitle + " in the title.\n"); };
        });
};
    
// ///////////////////////////////////////////////////////////////
// r e a d R a n d o m D o t T x t  function
//
function readRandomDotTxt () {
    
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
        
        var tempArr = data.split(",");
        var action = tempArr[0];
        var target = tempArr[1];

        if (action === "do-what-it-says") {
            console.log("Are you intentionally trying to put me in an infinite loop ?!?");
            return;
        }
        
        takeAction (action, target);

    });
}
    
// ///////////////////////////////////////////////////////////////
//  function: t a k e A c t i o n   
//
function takeAction(action,target) {

    switch (action) {
    
        case "concert-this" :
            console.log ("action: " + action + " | target: " + target);
            concertThis(target);
            break;
            
        case "spotify-this-song" :
            spotifyThisSong(target);
            break;
    
        case "movie-this" :
            movieThis(target);
            break;
    
        case "do-what-it-says" :
            readRandomDotTxt();
            break;
            
        default :
            console.log('Ooops, please put in something for me to do');
            break;
    };
}


// ///////////////////////////////////////////////////////////////
// M A I N  
//
var action = process.argv[2];
var target = process.argv.slice(3).join(" ");

takeAction (action, target);

