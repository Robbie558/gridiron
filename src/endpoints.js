const axios = require('axios');
const cheerio = require('cheerio');

const { getTeamLinks, getLeagueTitle, getCurrentWeekScores, getHistoricWeekScores, getweeksInYear, getPlayoffWeeks, getYearRosterSettings } = require('./cheerio-functions.js');
const utils = require('./utils/utils.js');

const { BASE_URL } = require('../config.js');

// Endpoints
function yearMetadata(targetUrl, res) {
    // Get weeks in year
    let weekArr = [], playoffWeekArr = [], rosterArr = [], returnArr = [];
    console.log(`Week Count URL: ${targetUrl}`);
    const playoffUrl = targetUrl.replace(/schedule\?.*/, `playoffs`);
    console.log(`Playoff Week Count URL: ${playoffUrl}`);
    const settingsUrl = targetUrl.replace(/schedule\?.*/, `settings`);
    console.log(`Settings URL: ${settingsUrl}`);
    axios.all([
        axios.get(targetUrl),
        axios.get(playoffUrl),
        axios.get(settingsUrl)]).then(axios.spread((weekRes, playoffWeekRes, settingsRes) => {
            // Get weeks in year
            const leagueHtmlParsed = cheerio.load(weekRes.data);
            weekArr = getweeksInYear(leagueHtmlParsed);
            // Get playoff weeks in year
            const playoffHtmlParsed = cheerio.load(playoffWeekRes.data);
            playoffWeekArr = getPlayoffWeeks(playoffHtmlParsed);
            // Get season roster settings
            const settingsHtmlParsed = cheerio.load(settingsRes.data);
            rosterArr = getYearRosterSettings(settingsHtmlParsed);
            returnArr.push({weekArr, playoffWeekArr, rosterArr});
            res.send(returnArr);
        })).catch(err => console.log(err));
}

function currentListTeams(targetUrl, res) {
    console.log(`URL: ${targetUrl}`);
    axios.get(targetUrl).then(response => {
        const leagueHtmlParsed = cheerio.load(response.data);
        let teamLinkArr = getTeamLinks(leagueHtmlParsed);
        utils.logJsonArray(teamLinkArr);
        res.send(teamLinkArr);
    }).catch(err => console.log(err));
}

function currentWeekListScores(targetUrl, res) {
    console.log(`URL: ${targetUrl}`);
    axios.get(targetUrl).then(response => {
        const leagueHtmlParsed = cheerio.load(response.data);
        let scoresArr = getCurrentWeekScores(leagueHtmlParsed);
        utils.logJsonArray(scoresArr);
        res.send(scoresArr);
    }).catch(err => console.log(err));
}


function historicalWeekListScore(targetUrl, res) {
    console.log(`URL: ${targetUrl}`);
    axios.get(targetUrl).then(response => {
        const leagueHtmlParsed = cheerio.load(response.data);
        let scoresArr = getHistoricWeekScores(leagueHtmlParsed);
        utils.logJsonArray(scoresArr);
        res.send(scoresArr);
    }).catch(err => console.log(err));
}

function health(res, port) {
    res.send(`GridIron is UP on port ${port}`);
}

module.exports = {
    yearMetadata,
    //yearPlayoffResults,
    currentListTeams,
    currentWeekListScores,
    historicalWeekListScore,
    health
}