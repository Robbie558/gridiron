const express = require('express');

const { PORT } = require('../config.js');

const { yearTopScores,leagueListTeams,currentWeekListScores,historicalWeekListScore,health } = require('./endpoints.js');

// Start express app on defined port
const app = express();
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

// Endpoints 
app.get(`/api/:league_id/:year/topscores`, (req,res) => yearTopScores(req,res));

app.get(`/api/:league_id/teams`, (req,res) => leagueListTeams(req,res));

app.get(`/api/:league_id/scores`, (req,res) => currentWeekListScores(req,res));

app.get(`/api/:league_id/:year/scores/:week`, (req,res) => historicalWeekListScore(req,res));

app.get(`/_health`, (req,res) => health(req,res,PORT));