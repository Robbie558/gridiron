const express = require('express');

const { BASE_URL, PORT } = require('../config.js');

const { health, fetchProccessedCheerioData, historicalYearTeamBenchScore, yearMetadata } = require('./endpoints.js');
const { getTeamLinks, getCurrentWeekScores, getHistoricPlayoffs, getHistoricWeekScores, getHistoricFinalStandings, getHistoricTeamWeekBenchTotalPoints, getHistoricRegularStandings } = require('./cheerio-functions.js');

// Start express app on defined port
const app = express();
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

// Endpoints 
app.get(`/_health`, (req, res) => health(res, PORT));

app.get(`/api/:league_id/teams`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id;
  fetchProccessedCheerioData(targetUrl, getTeamLinks, res);
});

app.get(`/api/:league_id/scores`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id;
  fetchProccessedCheerioData(targetUrl, getCurrentWeekScores, res);
});

app.get(`/api/:league_id/:year/scores/:week`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=" + req.params.week + "&scheduleType=week" + "&standingsTab=schedule";
  fetchProccessedCheerioData(targetUrl, getHistoricWeekScores, res);
});

app.get(`/api/:league_id/:year/standings/:standing_type`, (req, res) => {
  if (req.params.standing_type == "final") {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/standings?historyStandingsType=final";
    fetchProccessedCheerioData(targetUrl, getHistoricFinalStandings, res);
  }
  else {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/standings?historyStandingsType=regular";
    fetchProccessedCheerioData(targetUrl, getHistoricRegularStandings, res);
  }
});

app.get(`/api/:league_id/:year/metadata`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=1" + "&scheduleType=week" + "&standingsTab=schedule";
  yearMetadata(targetUrl, res);
});

app.get(`/api/:league_id/:year/playoffs/:playoff_bracket`, (req, res) => {
  if (req.params.playoff_bracket == "championship") {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/playoffs?bracketType=championship&standingsTab=playoffs";
    fetchProccessedCheerioData(targetUrl, getHistoricPlayoffs, res);
  } else {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/playoffs?bracketType=consolation&standingsTab=playoffs";
    fetchProccessedCheerioData(targetUrl, getHistoricPlayoffs, res);
  }
});

app.get(`/api/:league_id/:year/:week/:team_id/bench`, (req, res) => {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/teamhome?statCategory=stats&statSeason=" + req.params.year + "&statType=weekStats&statWeek=" + req.params.week + "&teamId=" + req.params.team_id + "&week=" + req.params.week;
    fetchProccessedCheerioData(targetUrl, getHistoricTeamWeekBenchTotalPoints, res);
});

app.get(`/api/:league_id/:year/:team_id/bench`, (req, res) => {
  //const seasonLengthUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=1" + "&scheduleType=week" + "&standingsTab=schedule";
  const seasonLength = 17; 
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/teamhome?statCategory=stats&statSeason=" + req.params.year + "&statType=weekStats&statweek=N&teamId=" + req.params.team_id + "&week=N";
  historicalYearTeamBenchScore(seasonLength, targetUrl, res);
});