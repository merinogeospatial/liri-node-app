// Dependencies
require("dotenv").config();
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const inquirer = require("inquirer");
const request = require("request");
const fs = require('fs');
const keys = require("./keys");


// User interaction with acquirer
// Prompt the user to provide location information.
function askUser() {
  inquirer.prompt([

    {
      type: "list",
      name: "action",
      message: "Hola, Liri-bot here! What would you like to do?",
      choices: ["Lookup latest tweets from Conan O'Brien", "Search for a Song on Spotify", "Lookup a Movie", "Do What it Says"]
    },

    {
      type: "input",
      name: "parameter",
      message: "Please type in the name the song or movie you would like to search! If you're not searching for anything just press 'enter'."
    }

    // After the prompt, store the user's response in a variable called location.
  ]).then(function (choice) {

    if (choice.action === "Lookup latest tweets from Conan O'Brien") {
      // Twitter Handling 
      const client = new Twitter(keys.twitter);

      var params = {
        screen_name: 'ConanOBrien'
      };
      client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (!error) {
          for (let i = 0; i < 20; i++) {
            console.log("============================================================================================================================================")
            console.log("||");
            console.log("|| (" + (i + 1) + ") " + tweets[i].created_at.split(" +")[0] + "|| > " + tweets[i].text);
            console.log("||");
          }
          console.log("============================================================================================================================================")
        }
      });

    } else if (choice.action === "Search for a Song on Spotify") {
      // Lookup song using Spotify api
      // Spotify Handling
      // const spotify = new Spotify(keys.spotify);
      chosenSong = choice.parameter;
      searchSong(chosenSong);
    } else if (choice.action === "Lookup a Movie") {
      // Lookup movie using omdb (use request!)
      chosenMovie = choice.parameter;
      searchMovie(chosenMovie);
    } else if (choice.action === "Do What it Says") {
      // Use fs to read random.text and use as command
      fs.readFile('./random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        action = data.split(",")[0];
        choice = data.split(",")[1];

        if (action === "Search for a Song on Spotify") {
          searchSong(choice);
        } else if (action === "Lookup a Movie") {
          searchMovie(choice);
        }

      });
    }

    // Ask user if they want to do something else
    inquirer.prompt([

      {
        type: "confirm",
        name: "confirm",
        message: "Would you like to do something else?"
      },


    ]).then(function (choice) {

      if (choice.confirm) {
        askUser();
      } else {
        console.log("Until next time! LIRI Bot shutting down...");
      }

    });

  });
}

// Function for searching a song
function searchSong(song) {

  // Lookup song using Spotify api
  const spotify = new Spotify(keys.spotify);

  if (song === '') {
    // Default if nothing specified
    song = 'The Sign by Ace of Base'
  } else {
    console.log("Searching for your song...")
  }
  spotify.search({
    type: 'track',
    query: song
  }, function (err, data) {

    if (err) {
      console.log("Something went wrong!");
    } else {
      console.log("|=======================================================");
      console.log("| Artist: ", data.tracks.items[0].artists[0].name);
      console.log("|=======================================================");
      console.log("| Track name: ", data.tracks.items[0].name);
      console.log("|=======================================================");
      console.log("| Preview link: ", data.tracks.items[0].external_urls.spotify);
      console.log("|=======================================================");
      console.log("| Album: ", data.tracks.items[0].album.name);
      console.log("|=======================================================");
    }
  });
}

function searchMovie(search) {

  request('http://www.omdbapi.com/?apikey=trilogy&t=' + search, function (error, response, body) {

    movie = JSON.parse(body);

    if (search === '') {
      console.log("You didn't type in a movie!");
    } else if (error) {
      console.log("Uh oh. Something went wrong! Error: ", error);
      console.log('statusCode:', response && response.statusCode);
    } else {
      console.log("================================================== ");
      console.log("|| *Title* ---", movie.Title);
      console.log("|| ..............................................");
      console.log("|| *Year released* ---", movie.Year);
      console.log("|| ..............................................");
      console.log("|| *IMDB rating* ---", movie.Ratings[0].Value);
      console.log("|| ..............................................");
      console.log("|| *Rotten Tomatoes score* ---", movie.Ratings[1].Value);
      console.log("|| ..............................................");
      console.log("|| *Country* ---", movie.Country);
      console.log("|| ..............................................");
      console.log("|| *Language(s)* ---", movie.Language)
      console.log("|| ..............................................");
      console.log("|| *Cast* ---", movie.Actors);
      console.log("==================================================");
      console.log("*Plot: ", movie.Plot);
      console.log("==================================================");
    }
  });
}





askUser();