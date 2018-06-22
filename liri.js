require("dotenv").config();
const keys = require("./keys");

// const spotify = new Spotify(keys.spotify);
// const client = new Twitter(keys.twitter);

// Ask about the above declarations... do I need to use new? Looks like I can access keys like the logging below?

console.log(keys.spotify);

console.log(keys.twitter);