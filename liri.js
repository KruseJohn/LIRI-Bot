require("dotenv").config();
// import fs package to read/write
var fs = require("fs");
// import API keys
var keys = require("./keys.js");
// import request NPM package
var request = require("request");
// import moment NPM package for time conversion
var moment = require("moment");
// import node--spoitfy-api NPM package
var Spotify = require("node-spotify-api");
// initialize spotify API with our id/secret
var spotify = new Spotify(keys.spotify);

// command line argument assignment
var action = process.argv[2];
var value = process.argv[3];

// function to determine which command is executed
function switchCase() {

    switch (action) {

        case "concert-this":
            bandsInTown();
            break;

        case "spotify-this-song":
            songInfo();
            break;

        case "movie-this":
            movieInfo();
            break;

        case "do-what-it-says":
            randomTxt();
            break;
    }
};

 // function for concert search
function bandsInTown() {

    var artist = process.argv.slice(3).join(" ");
    console.log(artist);

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryUrl, function (error, response, body) {
        if (response.statusCode === 200) {

            var result = JSON.parse(body)[0];

            console.log("\n----------------------------\n");
            console.log("Venue name: " + result.venue.name);
            console.log("Venue location: " + result.venue.city);
            console.log("Date: " + moment(result.datetime).format("MM/DD/YYYY"));
            console.log("\n_________________________________________________________________________________________________\n");

        } else {
            return console.log(error);
        }
    });
};

// function for song search
function songInfo() {

    var songSearch;
    if (value === undefined) {

        songSearch = "The Sign by Ace of Base";

    } else {

        songSearch = process.argv.slice(3).join(" ");

    };

    spotify.search({
        type: "track",
        query: songSearch,
        limit: 10
    }, function (err, data) {

        if (err) {
            return console.log("Error occurred: " + err);
        }


        for (var i = 0; i < data.tracks.items.length; i++) {

            console.log("\n");
            console.log("Search result #" + [i + 1]);
            console.log("------------------");
            console.log("Artist: " + data.tracks.items[i].artists[0].name);
            console.log("Song Title: " + data.tracks.items[i].name);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("Preview Track: " + data.tracks.items[i].preview_url);
            console.log("\n_______________________________________________________________________________________________________\n");

        }
    });
};

// function for movie search
function movieInfo() {

    var movieSearch;
    if (value === undefined) {

        movieSearch = "Mr. Nobody";

    } else {

        movieSearch = process.argv.slice(3).join(" ");

    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        var results = JSON.parse(body);

        if (response.statusCode === 200) {
            console.log("\n**************************");
            console.log("Title: " + results.Title);
            console.log("Release Year: " + results.Year);
            console.log("IMBD Rating: " + results.imdbRating);
            console.log("Rotten Tomatoes Rating: " + results.tomatoRating);
            console.log("Where produced: " + results.Country);
            console.log("Language: " + results.Language);
            console.log("Plot: " + results.Plot);
            console.log("Cast: " + results.Actors);
            console.log("\n***************************************************************************\n");
        } else {
            return console.log(error);
        }
    });
};


// function to read "random.txt" file and run command
function randomTxt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        console.log("\n");
        console.log(data);
        if (error) {

            return console.log(error);
        }

        var randomTxtArray = data.split(",");

        if (randomTxtArray[0] === "spotify-this-song") {

            var song = randomTxtArray[1].trim().slice(1, -1);

            spotify.search({
                type: "track",
                query: song
            }, function (err, data) {

                console.log("------------------");
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song Title: " + data.tracks.items[0].name);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("Preview Track: " + data.tracks.items[3].preview_url);
                console.log("\n_______________________________________________________________________________________________________\n");

            });
        }

    });
};

switchCase();