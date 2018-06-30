# LIRI BOT

Week 10 at The Coding Boot Camp @ UNC Chapel Hill learning Node. This app uses a command line interface (cli) to display the latest top 20 tweets from Conan O'Brien, look up a song on Spotify, or look up information about a movie. Additionally, The app can take in a command to look up a song or movie from a text file (random.txt).

![LIRI BOT cli](https://github.com/merinogeospatial/liri-node-app/blob/master/cli.png)

## Getting Started

This app require node to be installed. Ensure dependencies are installed for LIRI BOT by using:
`npm install`

Run the app simply with:
`node liri`

You will then be greeted and asked to navigate through different options using your arrows keys. You can select an action by pressing enter. If your action requires a search parameter - type this in and press `enter`. Otherwise, you can press `enter` without specifying anything.

## Built With

node
 - inquirer
 - request
 - twitter
 - node-spotify-api
