# liri-node-app
Week 10 - Homework: Make a Language Interpretation and Recognition Interface (LIRI) using command line node linking to three APIs 

## Objectives

This week's assignment takes a sharp turn, in that there is no browser componet, only using console.log in node,js to send messages to the console, using four (4) node packages to build the app:

* _Node-Spotify-API_: is used to handle the spotify/music action described below

* _Axios_: is used to make AJAX calls to the OMDB API and the Bands In Town API

* _Moment_: re-format the time that is returned from Bands In Town API 

* _DotEnv_: is used to NOT store the keys in GitHub.

Also, use _fs_ to read and write to the file system.


## Assignment
 
* Accept arguements on the command line to do one of the foloowing actions

### concert-this 
1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Lineup of performers
     * Name of the venue
     * Venue location
     * Date of the Event (use moment to format this as "MM/DD/YYYY")

### spotify-this-song
2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from _+ the track number_

   * If no song is provided then search for "revolution" 

   * Utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.


### movie-this
3. `node liri.js movie-this '<movie name here>'`

   * Output the following information to the terminal/bash window:

     ```
       * Title of the movie.
       * Movie Rating (PG, PG-134, etc)
       * Year the movie came out.
       * Review Ratings from IMDB, Rotten Tomatoes, and Metacritic 
       * Country where the movie was produced.
       * Language(s) spoken in the movie.
       * Actors in the movie.
       * Plot of the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Dr. Strangelove' 
     * *Peter Sellers is off the hook!*

   * Uses the `axios` package to retrieve data from the OMDB API. The OMDB API requires an API key ==> using `trilogy`.

### do-what-it-says
4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

     * Edit the text in random.txt to test out the feature for movie-this and concert-this.

### Special Instructions for Spotify API 

   * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>

   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

### Bonus Goals

## Personal Challenges

### Functions not used in homework before

* _array.map()_ used when result set returns an array of elements, e.g. names, or objects, e.g. source and value