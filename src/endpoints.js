const axios = require('axios');
const cheerio = require('cheerio');

const { getLeagueTitle, getHistoricWeekTeamAnalysis, getweeksInYear, getPlayoffWeeks, getYearRosterSettings, getYearLeagueSettings } = require('./cheerio-functions.js');
const utils = require('./utils/utils.js');

// Endpoints
function fetchRawCheerioData(targetUrl) {
    return axios.get(targetUrl).then(response => {
        const leagueHtmlParsed = cheerio.load(response.data);
        return { target: targetUrl, success: true, data: leagueHtmlParsed };
    }).catch(function (error) {
        return { success: false, message: error };
    });
}

function returnProcessedUrl(targetUrl, cheerioFunction, res) {
    return axios.get(targetUrl).then(response => {
        const cheerioDataObj = cheerio.load(response.data);
        let returnObj = cheerioFunction(cheerioDataObj);
        utils.logJsonArray(returnObj);
        res.send(returnObj);
    }).catch(function (error) {
        return { success: false, message: error };
    });
}

function health(res, port) {
    res.send(`GridIron is UP on port ${port}`);
}

function yearMetadata(targetUrl, res) {
    const weekUrl = targetUrl;
    console.log(`Week Count URL: ${weekUrl}`);
    const titleUrl = targetUrl.replace(/history.*/, ``);
    console.log(`Title Week Count URL: ${titleUrl}`)
    const playoffUrl = targetUrl.replace(/schedule\?.*/, `playoffs`);
    console.log(`Playoff Week Count URL: ${playoffUrl}`);
    const settingsUrl = targetUrl.replace(/schedule\?.*/, `settings`);
    console.log(`Settings URL: ${settingsUrl}`);
    Promise.all([
        axios.get(weekUrl),
        axios.get(titleUrl),
        axios.get(playoffUrl),
        axios.get(settingsUrl)]).then(axios.spread((weekRes, titleRes, playoffWeekRes, settingsRes) => {
            let returnArr = [];
            // Get weeks in year
            const weeksHtmlParsed = cheerio.load(weekRes.data);
            const seasonLength = getweeksInYear(weeksHtmlParsed);
            // Get League Title (Why is this so hard?!)
            const titleHtmlParsed = cheerio.load(titleRes.data);
            const leagueTitle = getLeagueTitle(titleHtmlParsed);
            // Get playoff weeks in year
            const playoffHtmlParsed = cheerio.load(playoffWeekRes.data);
            const playoffWeekArr = getPlayoffWeeks(playoffHtmlParsed);
            // Get season roster settings
            const settingsHtmlParsed = cheerio.load(settingsRes.data);
            const rosterArr = getYearRosterSettings(settingsHtmlParsed);
            let leagueConfig = getYearLeagueSettings(settingsHtmlParsed);
            leagueConfig = { ...leagueConfig, ...{seasonLength} };
            res.send({ leagueTitle, leagueConfig, playoffWeekArr, rosterArr });
        })).catch(err => console.log(err));
}

function getHistoricYearTeamAnalysis(seasonLengthUrl, targetUrl, res) {
    const weekUrlArr = []; 
    let benchTotal = 0, benchHighScore = 0;
    let activeTotal = 0, activeHighScore = 0;
    let teamName, teamOwner;
    // Build Weekly Score URLs
    axios.get(seasonLengthUrl).then(seasonLengthResponse => {
        const seasonLengthParsed = cheerio.load(seasonLengthResponse.data);
        const seasonLength = getweeksInYear(seasonLengthParsed);
        for (let i = 1; i <= seasonLength; i++) {
            let weekUrl = targetUrl.replace(/week=N/g, `week=${i}`);
            weekUrlArr.push(weekUrl);
        }
        // Cycle through Week URLs Array and process response
        Promise.all(weekUrlArr.map(fetchRawCheerioData)).then(allResponse => {
            allResponse.forEach((weekObj, weekIndex) => {
                let historicWeekAnalysis = getHistoricWeekTeamAnalysis(weekObj[`data`]);
                teamName = historicWeekAnalysis[`teamName`];
                teamOwner = historicWeekAnalysis[`teamOwner`];
                benchTotal += parseFloat(historicWeekAnalysis[`teamBenchTotal`]);
                activeTotal += parseFloat(historicWeekAnalysis[`teamActiveTotal`]);
                if (historicWeekAnalysis[`teamBenchTotal`] >= benchHighScore) {
                    benchHighScore = parseFloat(historicWeekAnalysis[`teamBenchTotal`]);
                    benchHighWeek = weekIndex;
                }
                if (historicWeekAnalysis[`teamActiveTotal`] >= activeHighScore) {
                    activeHighScore = parseFloat(historicWeekAnalysis[`teamActiveTotal`]);
                    activeHighWeek = weekIndex;
                }
            });
            const returnObj = { teamName, teamOwner, activeTotal, benchTotal, activeHigh: { activeHighScore, activeHighWeek }, benchHigh: { benchHighScore, benchHighWeek } }
            utils.logJsonArray(returnObj);
            res.send(returnObj);
        }).catch(function (error) {
            return { success: false, message: error };
        });
    }).catch(function (error) {
        return { success: false, message: error };
    });
}

module.exports = {
    fetchRawCheerioData,
    returnProcessedUrl,
    health,
    yearMetadata,
    getHistoricYearTeamAnalysis
}