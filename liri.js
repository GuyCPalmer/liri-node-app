require("dotenv").config();
let keys = require("./keys")
let request = require("request");

var nodeArgs = process.argv;
var action = nodeArgs[2].toLowerCase();

//movieThis 

function movieThis(action, nodeArgs) {
    //variable for movie name
   var movieName = "";
    //for if else
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i < 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }
    if (movieName == "") {
        movieName = "Mrs.+Doubtfire"
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
            for (var i = 0; i < bodyData.Ratings.length; i++) {
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
}
//movieThis

//twitterThis
function twitterThat() {
    var tw = require("twitter");
    var client = new tw({
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret
    });
    var params = {
        name: 'GuyClayton9',
        screen_name: 'GuyClayton9',
        exclude_replies: false,
        trim_user: true,
        count: 10
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var n = i + 1;
                console.log(n + '------');
                console.log('created: ' + tweets[i].created_at);
                console.log('text: ' + tweets[i].text);
                console.log('-------');
            }
        }
    });
}
//twitter this


if (action == "do-what-it-says") {

    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            var output = data.split(",");
            var nodeArgs = [];
            for (var i = 0; i < 3; i++) {
                nodeArgs[i] = "";
            }
            var tempName = "";
            for (var i = 0; i < output.length; i++) {
                if (i == 0) {
                    action = output[i].toLowerCase();
                } else {
                    if (i == 1) {
                        tempName = output[i];
                    } else {
                        tempName += "," + output[i];
                    }
                }
            }
            var nameArray = tempName.split(" ");
            for (var i = 0; i < nameArray.length; i++) {
                nodeArgs.push(nameArray[i]);
            }

            if (action == "movie-this") {
                movieThis(action, nodeArgs);
            } else if (action == "my-tweets") {
                twitterThat();
            }
        } 
    });
} else 
    if (action == "movie-this") {
        movieThis(action, nodeArgs);
    } else if (action == "my-tweets") {
    twitterThat();
    }