require("dotenv").config();
let keys = require("./keys")
let request = require("request");

var nodeArgs = process.argv;
var action = nodeArgs[2].toLowerCase();

function movieThis(action, nodeArgs) {
    //variable for movie name
    var movieName = "";
    //for else
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i < 3 && i < nodeArgs.length) {
            movieName = movieName + "" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }
    if (movieName == "") {
        movieName = "Not today Junior"
    }
}

//run OMDB API request with movie title using API key
var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=aa1abc76"
    //* Title of the movie.
    //* Year the movie came out.
    //* IMDB Rating of the movie.
    //* Rotten Tomatoes Rating of the movie.
    //* Country where the movie was produced.
    //* Language of the movie.
    //* Plot of the movie.
    //* Actors in the movie.
request(queryURL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        var bodyData = JSON.parse(body);
        if (bodyData.Response == "True") {
            console.log("Title: " + bodyData.Title);
            console.log("Year Released: " + bodyData.Year);
            console.log("Title: " + bodyData.imdbRating);

            var rottenTomatoes = "";
            for (var i = 0; i < bodyData.Ratings.length; i++){
                if (bodyData.Ratings[i].Source == "Rotten Tomatoes") {
                    rottenTomatoes = bodyData.Ratings[i].Value;
                }
            }
            console.log("Rotten Tomatoes: " + rottenTomatoes);
            console.log("Country: " + bodyData.Country);
            console.log("Language: " + bodyData.Language);
            console.log("Plot: " + bodyData.Plot);
            console.log("Actors: " + bodyData.Actors);
        } else {
            console.log("sorry, movie title" + movieName.split(/[+]+/).join(" ") + "doesn't exist.")
        }
    }
});

















