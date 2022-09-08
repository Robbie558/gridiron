const axios = require('axios');
const cheerio = require('cheerio');

const { getTeamLinks, getLeagueTitle, getCurrentWeekScores, getHistoricWeekScores, getweeksInYear } = require('./cheerio-functions.js');
const utils = require('./utils/utils.js');

const { BASE_URL } = require('../config.js');

// Endpoints 
function yearTopScores(req,res) {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=1&scheduleType=week&standingsTab=schedule";
    console.log(`URL: ${targetUrl}`);
    // Get weeks in year
    axios.get(targetUrl).then(response => {
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
}

function leagueListTeams(req,res) {
    const targetUrl = BASE_URL + req.params.league_id;
    console.log(`URL: ${targetUrl}`);
    axios.get(targetUrl).then(response => {
        let titleArr, teamLinkArr = [];
        const leagueHtmlParsed = cheerio.load(response.data);
        titleArr = getLeagueTitle(leagueHtmlParsed);
        teamLinkArr = getTeamLinks(leagueHtmlParsed);
        utils.logJsonArray(teamLinkArr);
        res.send(teamLinkArr);
    }).catch(err => console.log(err));
}

function currentWeekListScores(req,res) {
    const targetUrl = BASE_URL + req.params.league_id;
    console.log(`URL: ${targetUrl}`);
    axios.get(targetUrl).then(response => {
        let scoresArr = [];
        const leagueHtmlParsed = cheerio.load(response.data);
        scoresArr = getCurrentWeekScores(leagueHtmlParsed);
        utils.logJsonArray(scoresArr);
        res.send(scoresArr);
    }).catch(err => console.log(err));
}


function historicalWeekListScore(req,res) {
    const targetUrl = BASE_URL + req.params.league_id + "/history/" + req.params.year + "/schedule" + "?gameSeason=" + req.params.year + "&leagueId=" + req.params.league_id + "&scheduleDetail=" + req.params.week + "&scheduleType=week" + "&standingsTab=schedule";
    console.log(`URL: ${targetUrl}`);
    axios.get(targetUrl).then(response => {
        let scoresArr = [];
        const leagueHtmlParsed = cheerio.load(response.data);
        scoresArr = getHistoricWeekScores(leagueHtmlParsed);
        utils.logJsonArray(scoresArr);
        res.send(scoresArr);
    }).catch(err => console.log(err));
}

function health(req,res,port) {
    res.send(`GridIron is UP on port ${port}`);
}

module.exports = {
    yearTopScores,
    leagueListTeams,
    currentWeekListScores,
    historicalWeekListScore,
    health
  }