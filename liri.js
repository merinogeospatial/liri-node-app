// Dependencies
require("dotenv").config();
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const inquirer = require("inquirer");
const request = require("request");
const keys = require("./keys");


// User interaction with acquirer
// Prompt the user to provide location information.
inquirer.prompt([

  {
    type: "list",
    name: "action",
    message: "Hola, Liri-bot here! What would you like to do?",
    choices: ["Lookup Tweets", "Lookup a Song", "Lookup a Movie", "Surprise me!"]
  },

  {
    type: "input",
    name: "parameter",
    message: "Please type in the name the song or movie you would like to search! If you're not searching for anything just press 'enter'."
  }

// After the prompt, store the user's response in a variable called location.
]).then(function(choice) {
  
  if (choice.action === "Lookup Tweets") {
    // Look up tweets here using Twitter api
  }
  else if (choice.action === "Lookup a Song") {
    // Lookup song using Spotify api
  }
  else if (choice.action === "Lookup a Movie") {
    // Lookup movie using omdb (use request!)
    request('http://www.omdbapi.com/?apikey=trilogy&t=' + choice.parameter, function (error, response, body) {

      movie = JSON.parse(body);

      if (choice.parameter === '') {
        console.log("You didn't type in a movie!");
      }
      else if (error) {
        console.log("Uh oh. Something went wrong! Error: ", error);
        console.log('statusCode:', response && response.statusCode); 
      }
      else {
        console.log("============================== ");
        console.log("|| *Title* ---", movie.Title);
        console.log("|| ..........................");
        console.log("|| *Year released* ---", movie.Year);
        console.log("|| ..........................");
        console.log("|| *IMDB rating* ---", movie.Ratings[0].Value);
        console.log("|| ..........................");
        console.log("|| *Rotten Tomatoes score* ---", movie.Ratings[1].Value);
        console.log("|| ..........................");
        console.log("|| *Country* ---", movie.Country);
        console.log("|| ..........................");
        console.log("|| *Language(s)* ---", movie.Language)
        console.log("|| ..........................");
        console.log("|| *Cast* ---", movie.Actors);
        console.log("==============================");
        console.log("|| *Plot: ", movie.Plot);
        console.log("==============================");
      }
    });
  }
});



 // Twitter Handling 
const client = new Twitter(
  keys.twitter
);
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    // console.log(tweets);
  }
});

// Spotify Handling
const spotify = new Spotify(keys.spotify);

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      // return console.log('Error occurred: ' + err);
    }
   
  // console.log(data); 
  });