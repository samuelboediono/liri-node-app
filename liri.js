var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var input1 = process.argv[2];
var input2 = process.argv.splice(3).join(" ");

var keys = require('./keys');

function log() {

    fs.appendFile('./log.txt', input1 + " " + input2 + ", ", function(err) {

        if (err) {
            console.log(err);
        }
        else {
            console.log("Content Added!");
        }

    });
};


run();

function run() {
	var client = new Twitter(keys.twitterKeys);
	// console.log(client)
	if (input1 === "my-tweets") {
	
	var params = {
	    // screen_name: 'samuelboediono',
	    screen_name: 'CNN'
	    
	};
	console.log(params);
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
			// console.log(client);
			if (!error) {
				console.log('');
				console.log("Last 20 Tweets: ");
				console.log("----------------------------------------");
				tweets.forEach(function(individualTweet) {
					console.log("Time Created: " + individualTweet.created_at);
					console.log("Tweet: " + individualTweet.text);
					console.log("----------------------------------------");
				});
			}
			else {
				console.log(error);
			};
		});
		log();	
	}

	else if (input1 === "spotify-this-song") {
		if (input2.length < 1) {
			input2 = "The Sign Ace of Base";
		};

		spotify.search({type: "track", query: input2}, function(err, data) {
			if (err) {
				console.log("error occured: " + err);
				return;
			}
			console.log("");
			console.log("Spotify Song Results: ");
			console.log("----------------------------------------------------");
			console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
			console.log("Song Name: " + data.tracks.items[0].name);
			console.log("Preview Link: " + data.tracks.items[0].preview_url);
			console.log("Album Name: " + data.tracks.items[0].album.name);
			console.log("----------------------------------------------------");
		});

		log();

	}
	else if (input1 === "movie-this") {
		if (input2 < 1) {
			input2 = "Mr. Nobody";
		};
		
		request("https://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
		
			if (!error && response.statusCode === 200) {
				console.log('');
				console.log("OMDB Movie Information: ");
				console.log("-------------------------------------------------");
				console.log("Title of the movie: " + JSON.parse(body).Title);
				console.log("Year of the movie: " + JSON.parse(body).Year);
				console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
				console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
				console.log("Country produced in: " + JSON.parse(body).Country);
				console.log("Language: " + JSON.parse(body).Language);
				console.log("Plot of the movie: " + JSON.parse(body).Plot);
				console.log("Actors: " + JSON.parse(body).Actors);
				console.log("-------------------------------------------------");
			}
			else {
				console.log(error);
			}
		});

		log();
	}
	else if (input1 === "do-what-it-says") {
		log();
		fs.readFile("random.txt", "utf8", function(err, data) {
			if (err) throw err;

			var arr = data.split(",");

			input1 = arr[0].trim();
			input2 = arr[1].trim();
			run();
		});
	}
};


