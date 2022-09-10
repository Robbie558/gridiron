const express = require('express');

const { BASE_URL, PORT } = require('../config.js');

const { yearTopScores, leagueListTeams, currentWeekListScores, historicalWeekListScore, health } = require('./endpoints.js');

// Start express app on defined port
const app = express();
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

// Endpoints 
app.get(`/_health`, (req, res) => health(res, PORT));

app.get(`/api/:league_id/teams`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id;
  leagueListTeams(targetUrl,res);
});

app.get(`/api/:league_id/scores`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id;
  currentWeekListScores(targetUrl, res);
});

app.get(`/api/:league_id/:year/scores/:week`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=" + req.params.week + "&scheduleType=week" + "&standingsTab=schedule";
  historicalWeekListScore(targetUrl, res);
});

app.get(`/api/:league_id/:year/topscores`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=" + req.params.week + "&scheduleType=week" + "&standingsTab=schedule";
  yearTopScores(targetUrl, res);
});