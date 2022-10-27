const express = require('express');

const { BASE_URL, PORT } = require('../config.js');

const { health, returnProcessedUrl, getHistoricYearTeamAnalysis, yearMetadata } = require('./endpoints.js');
const { getTeamLinks, getCurrentWeekScores, getHistoricPlayoffs, getHistoricWeekScores, getHistoricFinalStandings, getHistoricWeekTeamAnalysis, getHistoricRegularStandings } = require('./cheerio-functions.js');
const { sendAxiosResult } = require('./utils/utils.js');

// Start express app on defined port
const app = express();
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

// Endpoints 
app.get(`/_health`, (req, res) => health(res, PORT));

app.get(`/api/:league_id/teams`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id;
  const teamsProcessedUrl = returnProcessedUrl(targetUrl, getTeamLinks);
  sendAxiosResult(teamsProcessedUrl, res);
});

app.get(`/api/:league_id/scores`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id;
  const scoresProcessedUrl = returnProcessedUrl(targetUrl, getCurrentWeekScores);
  sendAxiosResult(scoresProcessedUrl, res);
});

app.get(`/api/:league_id/scores/:year/:week`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=" + req.params.week + "&scheduleType=week" + "&standingsTab=schedule";
  const historicScoresProcessedUrl = returnProcessedUrl(targetUrl, getHistoricWeekScores);
  sendAxiosResult(historicScoresProcessedUrl, res);
});

app.get(`/api/:league_id/standings/:year/:standing_type`, (req, res) => {
  if (req.params.standing_type == "final") {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/standings?historyStandingsType=final";
    const finalStandingProcessedUrl = returnProcessedUrl(targetUrl, getHistoricFinalStandings);
    sendAxiosResult(finalStandingProcessedUrl, res);
  }
  else if (req.params.standing_type == "regular") {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/standings?historyStandingsType=regular";
    const regularStandingProcessedUrl = returnProcessedUrl(targetUrl, getHistoricRegularStandings);
    sendAxiosResult(regularStandingProcessedUrl, res);
  }
});

app.get(`/api/:league_id/metadata/:year`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=1" + "&scheduleType=week" + "&standingsTab=schedule";
  // TODO - Split out handling of the response
  yearMetadata(targetUrl, res);
});

app.get(`/api/:league_id/playoffs/:year/:playoff_bracket`, (req, res) => {
  if (req.params.playoff_bracket == "championship") {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/playoffs?bracketType=championship&standingsTab=playoffs";
    const playoffProcessedUrl = returnProcessedUrl(targetUrl, getHistoricPlayoffs, res);
    sendAxiosResult(playoffProcessedUrl, res);
  } 
  else if (req.params.playoff_bracket == "consolation") {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/playoffs?bracketType=consolation&standingsTab=playoffs";
    const consolationProcessedUrl = returnProcessedUrl(targetUrl, getHistoricPlayoffs, res);
    sendAxiosResult(consolationProcessedUrl, res);
  }
});

app.get(`/api/:league_id/week_analysis/:team_id/:year/:week/`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/teamhome?statCategory=stats&statSeason=" + req.params.year + "&statType=weekStats&statWeek=" + req.params.week + "&teamId=" + req.params.team_id + "&week=" + req.params.week;
  const weekAnalysisProcessedUrl = returnProcessedUrl(targetUrl, getHistoricWeekTeamAnalysis, res);
  sendAxiosResult(weekAnalysisProcessedUrl, res);
});

app.get(`/api/:league_id/year_analysis/:team_id/:year/`, (req, res) => {
  const seasonLengthUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=1" + "&scheduleType=week" + "&standingsTab=schedule";
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/teamhome?statCategory=stats&statSeason=" + req.params.year + "&statType=weekStats&statweek=N&teamId=" + req.params.team_id + "&week=N";
  // TODO - Split out handling of the response
  getHistoricYearTeamAnalysis(seasonLengthUrl, targetUrl, res);
});