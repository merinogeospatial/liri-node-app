// Dependencies
require("dotenv").config();
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const keys = require("./keys");

// const spotify = new Spotify(keys.spotify);
// const client = new Twitter(keys.twitter);


console.log(keys.spotify);
console.log(keys.twitter);

 // Twitter Handling 
const client = new Twitter(
  keys.twitter
);
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

// Spotify Handling
const spotify = new Spotify(keys.spotify);

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });