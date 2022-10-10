const express = require('express');

const { BASE_URL, PORT } = require('../config.js');

const { historicalYearTeamBenchScore, historicalWeekTeamBenchScore, historicalYearFinalStandings, historicalYearRegularStandings, historicalYearPlayoffs, historicalWeekListScore, currentListTeams, currentWeekListScores, yearMetadata, health } = require('./endpoints.js');

// Start express app on defined port
const app = express();
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

// Endpoints 
app.get(`/_health`, (req, res) => health(res, PORT));

app.get(`/api/:league_id/teams`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id;
  currentListTeams(targetUrl, res);
});

app.get(`/api/:league_id/scores`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id;
  currentWeekListScores(targetUrl, res);
});

app.get(`/api/:league_id/:year/scores/:week`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=" + req.params.week + "&scheduleType=week" + "&standingsTab=schedule";
  historicalWeekListScore(targetUrl, res);
});

app.get(`/api/:league_id/:year/standings/:standing_type`, (req, res) => {
  if (req.params.standing_type == "final") {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/standings?historyStandingsType=final";
    historicalYearFinalStandings(targetUrl, res);
  }
  else {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/standings?historyStandingsType=regular";
    historicalYearRegularStandings(targetUrl, res);
  }
});

app.get(`/api/:league_id/:year/metadata`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=1" + "&scheduleType=week" + "&standingsTab=schedule";
  yearMetadata(targetUrl, res);
});

app.get(`/api/:league_id/:year/playoffs/:playoff_bracket`, (req, res) => {
  if (req.params.playoff_bracket == "championship") {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/playoffs?bracketType=championship&standingsTab=playoffs";
    historicalYearPlayoffs(targetUrl, res);
  } else {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/playoffs?bracketType=consolation&standingsTab=playoffs";
    historicalYearPlayoffs(targetUrl, res);
  }
});

app.get(`/api/:league_id/:year/:week/:team_id/bench`, (req, res) => {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/teamhome?statCategory=stats&statSeason=" + req.params.year + "&statType=weekStats&statWeek=" + req.params.week + "&teamId=" + req.params.team_id + "&week=" + req.params.week;
    historicalWeekTeamBenchScore(targetUrl, res);
});

app.get(`/api/:league_id/:year/:team_id/bench`, (req, res) => {
  const metadataUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=1" + "&scheduleType=week" + "&standingsTab=schedule";
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/teamhome?statCategory=stats&statSeason=" + req.params.year + "&statType=weekStats&statweek=N&teamId=" + req.params.team_id + "&week=N";
  historicalYearTeamBenchScore(metadataUrl, targetUrl, res);
});