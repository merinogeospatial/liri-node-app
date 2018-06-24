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
    // Lookup movie using omdb (this is a request method!)
    request('http://www.omdbapi.com/?apikey=trilogy&t=the incredibles', function (error, response, body) {
      console.log('error:', error); 
      console.log('statusCode:', response && response.statusCode); 
      console.log('body:', body); 
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