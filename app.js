// const express = require("express");

// const rickAndMorty = require("rick-and-morty");

// const app = express();

// app.get("/", function(_req, res) {
//     const gif = rickAndMorty.all;
//     res.send(gif);
// });

// app.listen(3000, function() {
//     console.log("Server started on port 3000");
// });


// require express
const express = require("express");
// require https
const https = require("https");
require('dotenv').config();
const ejs = require("ejs");
// initialize a new express app
const app = express();

app.use('/css', express.static('css'));

app.use(express.urlencoded({ extended: true }));

app.get("/", function(_req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const character = req.body.characterNumber;
    // const location = req.body.locationNumber;
    // const episode = req.body.episodeNumber;
    const url = "https://rickandmortyapi.com/api/character/" + character;
    https.get(url, function(response) {
        response.on("data", function(data) {
            const characterData = JSON.parse(data)
            const name = characterData.name
            const status = characterData.status
            const gender = characterData.gender
            const avatar = characterData.id
                // const location = characterData.location[0].name
            const created = characterData.created
            const imageURL = "https://rickandmortyapi.com/api/character/avatar/" + avatar + ".jpeg"
            res.write("<h1>The character entered, " + character + ", is " + name + ", created on " + created + " and located in " + "</h1>");
            res.write("<h1>The gender is " + gender + ". This species is " + status + "</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
    const location = req.body.locationNumber;
    const locationUrl = "https://rickandmortyapi.com/api/location/" + location;
    https.get(locationUrl, function(response) {
        response.on("data", function(data) {
            const locationData = JSON.parse(data)
            const id = locationData.id
            const name = locationData.name
            const type = locationData.type
            const dimension = locationData.dimension
                // const residents = locationData.residents
            const created = locationData.created
            res.write("<h1>The location entered, " + id + ", is " + name + ", created on " + created + ".</h1>");
            res.write("<h1>The type is " + type + ". This location's dimesnsion is " + dimension + "</h1>");
            res.send();
        });
    });
    const episode = req.body.episodeNumber;
    const episodeUrl = "https://rickandmortyapi.com/api/episode/" + episode;

    https.get(episodeUrl, function(response) {
        response.on("data", function(data) {
            const episodeData = JSON.parse(data)
            const name = episodeData.name
            const airDate = episodeData.air_date
            const id = episodeData.id
            const episode = episodeData.episode
            const created = episodeData.created
            res.write("<h1>The episode entered, " + id + ", is " + episode + ", and its name is " + name + ".</h1>");
            res.write("<h1>The date it aired on is " + airDate + ". This episode was created on " + created + "</h1>");
            res.send();
        });
    });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});