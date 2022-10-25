const express = require('express');

const { BASE_URL, PORT } = require('../config.js');

const { health, returnProcessedUrl, getHistoricYearTeamAnalysis, yearMetadata } = require('./endpoints.js');
const { getTeamLinks, getCurrentWeekScores, getHistoricPlayoffs, getHistoricWeekScores, getHistoricFinalStandings, getHistoricWeekTeamAnalysis, getHistoricRegularStandings } = require('./cheerio-functions.js');

// Start express app on defined port
const app = express();
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

// Endpoints 
app.get(`/_health`, (req, res) => health(res, PORT));

app.get(`/api/:league_id/teams`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id;
  returnProcessedUrl(targetUrl, getTeamLinks, res);
});

app.get(`/api/:league_id/scores`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id;
  returnProcessedUrl(targetUrl, getCurrentWeekScores, res);
});

app.get(`/api/:league_id/scores/:year/:week`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=" + req.params.week + "&scheduleType=week" + "&standingsTab=schedule";
  returnProcessedUrl(targetUrl, getHistoricWeekScores, res);
});

app.get(`/api/:league_id/standings/:year/:standing_type`, (req, res) => {
  if (req.params.standing_type == "final") {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/standings?historyStandingsType=final";
    returnProcessedUrl(targetUrl, getHistoricFinalStandings, res);
  }
  else {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/standings?historyStandingsType=regular";
    returnProcessedUrl(targetUrl, getHistoricRegularStandings, res);
  }
});

app.get(`/api/:league_id/metadata/:year`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=1" + "&scheduleType=week" + "&standingsTab=schedule";
  yearMetadata(targetUrl, res);
});

app.get(`/api/:league_id/playoffs/:year/:playoff_bracket`, (req, res) => {
  if (req.params.playoff_bracket == "championship") {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/playoffs?bracketType=championship&standingsTab=playoffs";
    returnProcessedUrl(targetUrl, getHistoricPlayoffs, res);
  } else {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/playoffs?bracketType=consolation&standingsTab=playoffs";
    returnProcessedUrl(targetUrl, getHistoricPlayoffs, res);
  }
});

app.get(`/api/:league_id/week_analysis/:team_id/:year/:week/`, (req, res) => {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/teamhome?statCategory=stats&statSeason=" + req.params.year + "&statType=weekStats&statWeek=" + req.params.week + "&teamId=" + req.params.team_id + "&week=" + req.params.week;
    returnProcessedUrl(targetUrl, getHistoricWeekTeamAnalysis, res);
});

app.get(`/api/:league_id/year_analysis/:team_id/:year/`, (req, res) => {
  const seasonLengthUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=1" + "&scheduleType=week" + "&standingsTab=schedule";
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/teamhome?statCategory=stats&statSeason=" + req.params.year + "&statType=weekStats&statweek=N&teamId=" + req.params.team_id + "&week=N";
  getHistoricYearTeamAnalysis(seasonLengthUrl, targetUrl, res);
});