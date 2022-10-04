const axios = require('axios');
const cheerio = require('cheerio');

const { getTeamLinks, getLeagueTitle, getCurrentWeekScores, getHistoricPlayoffs, getHistoricWeekScores, getHistoricFinalStandings, getHistoricTeamBenchTotalPoints, getHistoricRegularStandings, getweeksInYear, getPlayoffWeeks, getYearRosterSettings, getYearLeagueSettings } = require('./cheerio-functions.js');
const utils = require('./utils/utils.js');

// Endpoints
function yearMetadata(targetUrl, res) {
    const weekUrl = targetUrl;
    console.log(`Week Count URL: ${weekUrl}`);
    const titleUrl = targetUrl.replace(/history.*/, ``);
    console.log(`Title Week Count URL: ${titleUrl}`)
    const playoffUrl = targetUrl.replace(/schedule\?.*/, `playoffs`);
    console.log(`Playoff Week Count URL: ${playoffUrl}`);
    const settingsUrl = targetUrl.replace(/schedule\?.*/, `settings`);
    console.log(`Settings URL: ${settingsUrl}`);
    axios.all([
        axios.get(weekUrl),
        axios.get(titleUrl),
        axios.get(playoffUrl),
        axios.get(settingsUrl)]).then(axios.spread((weekRes, titleRes, playoffWeekRes, settingsRes) => {
            let returnArr = [];
            // Get weeks in year
            const leagueHtmlParsed = cheerio.load(weekRes.data);
            const weekArr = getweeksInYear(leagueHtmlParsed);
            // Get League Title (Why is this so hard?!)
            const titleHtmlParsed = cheerio.load(titleRes.data);
            const leagueTitle = getLeagueTitle(titleHtmlParsed);
            // Get playoff weeks in year
            const playoffHtmlParsed = cheerio.load(playoffWeekRes.data);
            const playoffWeekArr = getPlayoffWeeks(playoffHtmlParsed);
            // Get season roster settings
            const settingsHtmlParsed = cheerio.load(settingsRes.data);
            const rosterArr = getYearRosterSettings(settingsHtmlParsed);
            const leagueSettings = getYearLeagueSettings(settingsHtmlParsed);
            returnArr.push({ leagueTitle, leagueSettings, weekArr, playoffWeekArr, rosterArr });
            res.send(returnArr);
        })).catch(err => console.log(err));
}

function historicalYearFinalStandings(targetUrl, res) {
    console.log(`URL: ${targetUrl}`);
    axios.get(targetUrl).then(response => {
        const leagueHtmlParsed = cheerio.load(response.data);
        let leagueStandingsArr = getHistoricFinalStandings(leagueHtmlParsed);
        utils.logJsonArray(leagueStandingsArr);
        res.send(leagueStandingsArr);
    }).catch(err => console.log(err));
}

function historicalYearRegularStandings(targetUrl, res) {
    console.log(`URL: ${targetUrl}`);
    axios.get(targetUrl).then(response => {
        const leagueHtmlParsed = cheerio.load(response.data);
        let leagueStandingsArr = getHistoricRegularStandings(leagueHtmlParsed);
        utils.logJsonArray(leagueStandingsArr);
        res.send(leagueStandingsArr);
    }).catch(err => console.log(err));
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

function historicalYearPlayoffs(targetUrl, res) {
    console.log(`URL: ${targetUrl}`);
    axios.get(targetUrl).then(response => {
        const leagueHtmlParsed = cheerio.load(response.data);
        let PlayoffsArr = getHistoricPlayoffs(leagueHtmlParsed);
        utils.logJsonArray(PlayoffsArr);
        res.send(PlayoffsArr);
    }).catch(err => console.log(err));
}

function historicalWeekTeamBenchScore(targetUrl, res) {
    console.log(`URL: ${targetUrl}`);
    axios.get(targetUrl).then(response => {
        const leagueHtmlParsed = cheerio.load(response.data);
        let scoresArr = getHistoricTeamBenchTotalPoints(leagueHtmlParsed);
        utils.logJsonArray(scoresArr);
        res.send(scoresArr);
    }).catch(err => console.log(err));
}

function health(res, port) {
    res.send(`GridIron is UP on port ${port}`);
}

module.exports = {
    historicalWeekTeamBenchScore,
    yearMetadata,
    currentListTeams,
    currentWeekListScores,
    historicalWeekListScore,
    historicalYearFinalStandings,
    historicalYearRegularStandings,
    historicalYearPlayoffs,
    health
}