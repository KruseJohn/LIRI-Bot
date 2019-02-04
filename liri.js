
require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var request = require("request");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


var action = process.argv[2];
var value = process.argv[3];


function switchCase() {

    switch (action) {

        case "concert":
        bandsInTown();
        break;

        case "song":
        songInfo(value);
        break;

        case "movie":
        movieInfo(value);
        break;

        case "do":
        randomTxt();
        break;
    }
};


function bandsInTown() {

    var artist = process.argv.slice(3).join(" ");
    console.log(artist);

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryUrl, function(error, response, body) {
         if (response.statusCode === 200) {
            
        var result = JSON.parse(body)[0];

        console.log("\n---------------------------------------------------\n");
        console.log("Venue name: " + result.venue.name);
        console.log("Venue location: " + result.venue.city);
        console.log("Date: " + moment(result.datetime).format("MM/DD/YYYY"));
        console.log("\n---------------------------------------------------\n");
        
        } else {
            return console.log(error);
        }
    });
};


function songInfo(value) {

    var songSearch;
    if (value === undefined) {

        songSearch = "The Sign by Ace of Base";

    } else {

        songSearch = value;
    }

    spotify.search({type: "track", query: songSearch}, function(err, data) {

        if (err) {
            return console.log("Error occurred: " + err);

        } else { 
            console.log("\n___________________________________________________\n");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[3].album.name);
            console.log("Preview: " + data.tracks.items[0].preview_url);
            console.log("\n___________________________________________________\n");
        }
    });
};

function movieInfo(value) {
    
    var movieSearch;
    if (value === undefined) {
        
        movieSearch = "Mr. Nobody";

    } else {

        movieSearch = value;
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

        var results = JSON.parse(body);

        if (response.statusCode === 200) {
            console.log("\n***************************************************\n");
            console.log("Title: " + results.Title);
            console.log("Release Year: " + results.Year);
            console.log("IMBD Rating: " + results.imdbRating);
            console.log("Rotten Tomatoes Rating: " + results.tomatoRating);
            console.log("Where produced: " + results.Country);
            console.log("Language: " + results.Language);
            console.log("Plot: " + results.Plot);
            console.log("Cast: " + results.Actors);
            console.log("\n***************************************************\n");
        } else {
            return console.log(error);
        }
    });
};


function randomTxt() {
    fs.readFile("random.txt", "utf-8", function(error, data) {

        if (error) {
            return console.log(error);
        }

        var randomTxtArray = data.split(",");

        if (randomTxtArray[0] === "song") {
            
            var song = randomTxtArray[1].trim().slice(1, -1);
            
            songInfo(song);
        }

    });
};

switchCase();