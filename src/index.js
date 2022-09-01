const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const { PORT, BASE_URL } = require('../config.js');
const { getTeamLinks, getLeagueTitle, getCurrentWeekScores, getHistoricWeekScores, getweeksInYear } = require('./cheerio-functions.js');

// Start express app on defined port
const app = express();
const listenPort = process.env.PORT || 8080;
app.listen(listenPort, () => console.log(`Server listening on ${PORT}`));

// Endpoints 
app.get(`/api/:league_id/:year/topscores`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=1&scheduleType=week&standingsTab=schedule";
  console.log(`URL: ${targetUrl}`);
  // Get weeks in year
  axios.get(targetUrl)
    .then(response => {
      const leagueHtmlRaw = response.data;
      const leagueHtmlParsed = cheerio.load(leagueHtmlRaw);
      const weekCount = getweeksInYear(leagueHtmlParsed);
      console.log(`League weeks for ${req.params.year}: ${weekCount}`);
      // for each week in year get that weeks scores
      for (let i = 1; i <= weekCount; i++) {
        const weekScoresUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=" + i + "&scheduleType=week" + "&standingsTab=schedule";
        console.log(`--- Week ${i} Scores URL: ${weekScoresUrl}`);
        axios.get(weekScoresUrl)
          .then(response => {
            const leagueHtmlRaw = response.data;
            const leagueHtmlParsed = cheerio.load(leagueHtmlRaw);
            getWeekScores(leagueHtmlParsed);
          }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err));
  //   put all scores in an array
  //   sort array, limit to first 10 and return
});

app.get(`/api/:league_id/teams`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id;
  console.log(`URL: ${targetUrl}`);
  axios.get(targetUrl).then(response => {
      let titleArr, teamLinkArr = [];
      const leagueHtmlParsed = cheerio.load(response.data);
      titleArr = getLeagueTitle(leagueHtmlParsed);
      teamLinkArr = getTeamLinks(leagueHtmlParsed);
      const jsonTeamsArray = JSON.stringify(teamLinkArr);
      console.log(`Results for league :league_id: ${jsonTeamsArray}`);
      res.send(teamLinkArr);
    }).catch(err => console.log(err));
});

app.get(`/api/:league_id/scores`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id;
  console.log(`URL: ${targetUrl}`);
  axios.get(targetUrl).then(response => {
    let scoresArr = [];
    const leagueHtmlParsed = cheerio.load(response.data);
    scoresArr = getCurrentWeekScores(leagueHtmlParsed);
    const jsonScoresArr = JSON.stringify(scoresArr);
    console.log(`Results for league :league_id: ${jsonScoresArr}`);
    res.send(scoresArr);
  }).catch(err => console.log(err));
});

app.get(`/api/:league_id/:year/scores/:week`, (req, res) => {
  const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=" + req.params.week + "&scheduleType=week" + "&standingsTab=schedule";
  console.log(`URL: ${targetUrl}`);
  axios.get(targetUrl).then(response => {
    let scoresArr = [];
    const leagueHtmlParsed = cheerio.load(response.data);
    scoresArr = getHistoricWeekScores(leagueHtmlParsed);
    const jsonScoresArr = JSON.stringify(scoresArr);
    console.log(`Results for league :league_id: ${jsonScoresArr}`);
    res.send(scoresArr);
  }).catch(err => console.log(err));
});