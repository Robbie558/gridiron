const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const { PORT, BASE_URL, LEAGUE_ID } = require('../config.js');
const { getTeamLinks, getLeagueTitle, getCurrentWeekScores, getHistoricWeekScores, getweeksInYear } = require('./cheerio-functions.js');

// Start express app on defined port
const app = express();
const listenPort = process.env.PORT || 8080;
app.listen(listenPort, () => console.log(`Server listening on ${PORT}`));

// Endpoints 
app.get(`/api/${LEAGUE_ID}/:year/topscores`, (req, res) => {
  const targetUrl = BASE_URL + LEAGUE_ID + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + LEAGUE_ID + "&scheduleDetail=1&scheduleType=week&standingsTab=schedule";
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
        const weekScoresUrl = BASE_URL + LEAGUE_ID + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + LEAGUE_ID + "&scheduleDetail=" + i + "&scheduleType=week" + "&standingsTab=schedule";
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

app.get(`/api/${LEAGUE_ID}/teams`, (req, res) => {
  const targetUrl = BASE_URL + LEAGUE_ID;
  console.log(`URL: ${targetUrl}`);
  axios.get(targetUrl).then(response => {
      let titleArr, teamLinkArr = [];
      const leagueHtmlParsed = cheerio.load(response.data);
      titleArr = getLeagueTitle(leagueHtmlParsed);
      teamLinkArr = getTeamLinks(leagueHtmlParsed);
      const jsonTeamsArray = JSON.stringify(teamLinkArr);
      console.log(`Results for league ${LEAGUE_ID}: ${jsonTeamsArray}`);
      res.send(teamLinkArr);
    }).catch(err => console.log(err));
});

app.get(`/api/${LEAGUE_ID}/scores`, (req, res) => {
  const targetUrl = BASE_URL + LEAGUE_ID;
  console.log(`URL: ${targetUrl}`);
  axios.get(targetUrl).then(response => {
    let scoresArr = [];
    const leagueHtmlParsed = cheerio.load(response.data);
    console.log(leagueHtmlParsed.html());
    scoresArr = getCurrentWeekScores(leagueHtmlParsed);
    const jsonScoresArr = JSON.stringify(scoresArr);
    console.log(`Results for league ${LEAGUE_ID}: ${jsonScoresArr}`);
    res.send(scoresArr);
  }).catch(err => console.log(err));
});

app.get(`/api/${LEAGUE_ID}/:year/scores/:week`, (req, res) => {
  const targetUrl = BASE_URL + LEAGUE_ID + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + LEAGUE_ID + "&scheduleDetail=" + req.params.week + "&scheduleType=week" + "&standingsTab=schedule";
  console.log(`URL: ${targetUrl}`);
  axios.get(targetUrl).then(response => {
    let scoresArr = [];
    const leagueHtmlParsed = cheerio.load(response.data);
    scoresArr = getHistoricWeekScores(leagueHtmlParsed);
    const jsonScoresArr = JSON.stringify(scoresArr);
    console.log(`Results for league ${LEAGUE_ID}: ${jsonScoresArr}`);
    res.send(scoresArr);
  }).catch(err => console.log(err));
});