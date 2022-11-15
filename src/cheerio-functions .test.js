const endpoints = require('./endpoints.js');
const cheerioFunctions = require('./cheerio-functions');
const utils = require('./utils/utils.js');

const { BASE_URL, PORT } = require('../config.js');

describe('Cheerio Function Tests', () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const returnProcessedUrlMock = jest.spyOn(endpoints, "returnProcessedUrl");
  const returnAxiosResultMock = jest.spyOn(utils, "returnAxiosResult");
  const leagueIdMock = 2285751;
  const leagueYearMock = 2020;

  describe('returnProcessedUrl', () => {

    let getAxiosResult, mockRes, getTeamUrlsMock;

    describe('getTeamUrls', () => {

      it('should return an array of objects', async () => {

        getTeamUrlsMock = jest.spyOn(cheerioFunctions, "getTeamUrls");

        const teamUrl = BASE_URL + leagueIdMock;

        mockRes = await returnProcessedUrlMock(teamUrl, getTeamUrlsMock);
        getAxiosResult = await returnAxiosResultMock(mockRes);

        expect(returnProcessedUrlMock).toHaveBeenCalledWith(`https://fantasy.nfl.com/league/${leagueIdMock}`, getTeamUrlsMock);
        expect(mockRes).toBeInstanceOf(Object);
        expect(getAxiosResult).toBeInstanceOf(Array);
        expect(getAxiosResult[0]).toBeInstanceOf(Object);
      },10000);

      it('with the expected keys', () => {

        expect(getAxiosResult[0]).toHaveProperty('teamId', 'teamName', 'TeamUrl');

      },10000);

    });

    describe('getCurrentWeekScores', () => {

      let getAxiosResult, mockRes, getCurrentWeekScoresMock;

      it('should return an array of objects', async () => {

        getCurrentWeekScoresMock = jest.spyOn(cheerioFunctions, "getCurrentWeekScores"); 

        const scoresUrl = BASE_URL + leagueIdMock;

        mockRes = await returnProcessedUrlMock(scoresUrl, getCurrentWeekScoresMock);
        getAxiosResult = await returnAxiosResultMock(mockRes);

        expect(returnProcessedUrlMock).toHaveBeenCalledWith(`https://fantasy.nfl.com/league/${leagueIdMock}`, getCurrentWeekScoresMock);
        expect(mockRes).toBeInstanceOf(Object);
        expect(getAxiosResult).toBeInstanceOf(Array);
        expect(getAxiosResult[0]).toBeInstanceOf(Object);
      },10000);

      it('with the expected keys', () => {

        expect(getAxiosResult[0]).toHaveProperty('matchupTitle');
        expect(getAxiosResult[0]).toHaveProperty('scores.firstOpponentName');
        expect(getAxiosResult[0]).toHaveProperty('scores.firstOpponentScore');
        expect(getAxiosResult[0]).toHaveProperty('scores.lastOpponentName');
        expect(getAxiosResult[0]).toHaveProperty('scores.lastOpponentScore');

      },10000);

    });

    describe('getHistoricWeekScores', () => {

      let getAxiosResult, mockRes, getHistoricWeekScoresMock;

      it('should return an array of objects', async () => {

        getHistoricWeekScoresMock = jest.spyOn(cheerioFunctions, "getHistoricWeekScores");
        
        const scoresUrl = BASE_URL + leagueIdMock + "/history/" + leagueYearMock + "/schedule?gameSeason=" + "2020" + "&leagueId=" + leagueIdMock + "&scheduleDetail=1&scheduleType=week&standingsTab=schedule";

        mockRes = await returnProcessedUrlMock(scoresUrl, getHistoricWeekScoresMock);
        getAxiosResult = await returnAxiosResultMock(mockRes);

        expect(returnProcessedUrlMock).toHaveBeenCalledWith(`https://fantasy.nfl.com/league/2285751/history/${leagueYearMock}/schedule?gameSeason=2020&leagueId=${leagueIdMock}&scheduleDetail=1&scheduleType=week&standingsTab=schedule`, getHistoricWeekScoresMock);
        expect(mockRes).toBeInstanceOf(Object);
        expect(getAxiosResult).toBeInstanceOf(Array);
        expect(getAxiosResult[0]).toBeInstanceOf(Object);
      },10000);

      it('with the expected keys', () => {

        expect(getAxiosResult[0]).toHaveProperty('matchupTitle');
        expect(getAxiosResult[0]).toHaveProperty('matchupWinner');
        expect(getAxiosResult[0]).toHaveProperty('scores.firstTeamName');
        expect(getAxiosResult[0]).toHaveProperty('scores.firstTeamOwner');
        expect(getAxiosResult[0]).toHaveProperty('scores.firstTeamScore');
        expect(getAxiosResult[0]).toHaveProperty('scores.lastTeamName');
        expect(getAxiosResult[0]).toHaveProperty('scores.lastTeamOwner');
        expect(getAxiosResult[0]).toHaveProperty('scores.lastTeamScore');
      },10000);

    });

    describe('getHistoricFinalStandings', () => {

      it('should return an array of objects', async () => {

        getHistoricFinalStandingsMock = jest.spyOn(cheerioFunctions, "getHistoricFinalStandings");

        const teamUrl = BASE_URL + leagueIdMock + "/history/2020/standings?historyStandingsType=final";

        mockRes = await returnProcessedUrlMock(teamUrl, getHistoricFinalStandingsMock);
        getAxiosResult = await returnAxiosResultMock(mockRes);

        expect(returnProcessedUrlMock).toHaveBeenCalledWith(`https://fantasy.nfl.com/league/${leagueIdMock}/history/2020/standings?historyStandingsType=final`, getHistoricFinalStandingsMock);
        expect(mockRes).toBeInstanceOf(Object);
        expect(getAxiosResult).toBeInstanceOf(Array);
        expect(getAxiosResult[0]).toBeInstanceOf(Object);
      },10000);

      it('with the expected keys', () => {

        expect(getAxiosResult[0]).toHaveProperty('teamRank', 'teamName', 'teamUrl');

      },10000);

    });

    describe('getHistoricRegularStandings', () => {

      it('should return an array of objects', async () => {

        getHistoricRegularStandingsMock = jest.spyOn(cheerioFunctions, "getHistoricRegularStandings");

        const teamUrl = BASE_URL + leagueIdMock + "/history/2020/standings?historyStandingsType=regular";

        mockRes = await returnProcessedUrlMock(teamUrl, getHistoricRegularStandingsMock);
        getAxiosResult = await returnAxiosResultMock(mockRes);

        expect(returnProcessedUrlMock).toHaveBeenCalledWith(`https://fantasy.nfl.com/league/${leagueIdMock}/history/2020/standings?historyStandingsType=regular`, getHistoricRegularStandingsMock);
        expect(mockRes).toBeInstanceOf(Object);
        expect(getAxiosResult).toBeInstanceOf(Array);
        expect(getAxiosResult[0]).toBeInstanceOf(Object);
      },10000);

      it('with the expected keys', () => {

        expect(getAxiosResult[0]).toHaveProperty('teamRank', 'teamName', 'teamUrl');

      },10000);

    });

    describe('getHistoricPlayoffs - Championship', () => {

      let getAxiosResult, mockRes, getHistoricPlayoffsMock;

      it('should return an array of objects', async () => {

        getHistoricPlayoffsMock = jest.spyOn(cheerioFunctions, "getHistoricPlayoffs");
        
        const scoresUrl = BASE_URL + leagueIdMock + "/history/" + leagueYearMock + "/playoffs?bracketType=championship&standingsTab=playoffs";

        mockRes = await returnProcessedUrlMock(scoresUrl, getHistoricPlayoffsMock);
        getAxiosResult = await returnAxiosResultMock(mockRes);

        expect(returnProcessedUrlMock).toHaveBeenCalledWith(`https://fantasy.nfl.com/league/2285751/history/${leagueYearMock}/playoffs?bracketType=championship&standingsTab=playoffs`, getHistoricPlayoffsMock);
        expect(mockRes).toBeInstanceOf(Object);
        expect(getAxiosResult).toBeInstanceOf(Array);
        expect(getAxiosResult[0]).toBeInstanceOf(Object);
      },10000);

      it('with the expected keys', () => {

        expect(getAxiosResult[0]).toHaveProperty('playoffWeek');
        expect(getAxiosResult[0]).toHaveProperty('matchupArr[0].matchupType');
        expect(getAxiosResult[0]).toHaveProperty('matchupArr[0].matchupName');
        expect(getAxiosResult[0]).toHaveProperty('matchupArr[0].matchupWinner');
        expect(getAxiosResult[0]).toHaveProperty('matchupArr[0].teamArr[0].playoffTeamName');
        expect(getAxiosResult[0]).toHaveProperty('matchupArr[0].teamArr[0].playoffTeamSeed');
        expect(getAxiosResult[0]).toHaveProperty('matchupArr[0].teamArr[0].playoffTeamScore');
      },10000);

    });

    describe('getHistoricPlayoffs - Consolation', () => {

      let getAxiosResult, mockRes, getHistoricPlayoffsMock;

      it('should return an array of objects', async () => {

        getHistoricPlayoffsMock = jest.spyOn(cheerioFunctions, "getHistoricPlayoffs");
        
        const scoresUrl = BASE_URL + leagueIdMock + "/history/" + leagueYearMock + "/playoffs?bracketType=consolation&standingsTab=playoffs";

        mockRes = await returnProcessedUrlMock(scoresUrl, getHistoricPlayoffsMock);
        getAxiosResult = await returnAxiosResultMock(mockRes);

        expect(returnProcessedUrlMock).toHaveBeenCalledWith(`https://fantasy.nfl.com/league/2285751/history/${leagueYearMock}/playoffs?bracketType=consolation&standingsTab=playoffs`, getHistoricPlayoffsMock);
        expect(mockRes).toBeInstanceOf(Object);
        expect(getAxiosResult).toBeInstanceOf(Array);
        expect(getAxiosResult[0]).toBeInstanceOf(Object);
      },10000);

      it('with the expected keys', () => {

        expect(getAxiosResult[0]).toHaveProperty('playoffWeek');
        expect(getAxiosResult[0]).toHaveProperty('matchupArr[0].matchupType');
        expect(getAxiosResult[0]).toHaveProperty('matchupArr[0].matchupName');
        expect(getAxiosResult[0]).toHaveProperty('matchupArr[0].matchupWinner');
        expect(getAxiosResult[0]).toHaveProperty('matchupArr[0].teamArr[0].playoffTeamName');
        expect(getAxiosResult[0]).toHaveProperty('matchupArr[0].teamArr[0].playoffTeamSeed');
        expect(getAxiosResult[0]).toHaveProperty('matchupArr[0].teamArr[0].playoffTeamScore');
      },10000);

    });

    describe('getHistoricWeekTeamAnalysis', () => {

      let getAxiosResult, mockRes, getHistoricWeekTeamAnalysisMock;

      it('should return an object', async () => {

        getHistoricWeekTeamAnalysisMock = jest.spyOn(cheerioFunctions, "getHistoricWeekTeamAnalysis");

        const scoresUrl = BASE_URL + leagueIdMock + "/history/" + leagueYearMock + "/teamhome?statCategory=stats&statSeason=" + "2020" + "&statType=weekStats&statWeek=" + "1" + "&teamId=1&week=" + "1";

        mockRes = await returnProcessedUrlMock(scoresUrl, getHistoricWeekTeamAnalysisMock);
        getAxiosResult = await returnAxiosResultMock(mockRes);

        expect(returnProcessedUrlMock).toHaveBeenCalledWith(`https://fantasy.nfl.com/league/2285751/history/${leagueYearMock}/teamhome?statCategory=stats&statSeason=2020&statType=weekStats&statWeek=1&teamId=1&week=1`, getHistoricWeekTeamAnalysisMock);
        expect(mockRes).toBeInstanceOf(Object);
        expect(getAxiosResult).toBeInstanceOf(Object);
      },10000);

      it('with the expected keys', () => {

        expect(getAxiosResult).toHaveProperty('teamName');
        expect(getAxiosResult).toHaveProperty('teamOwner');
        expect(getAxiosResult).toHaveProperty('benchTeamTotal');
        expect(getAxiosResult).toHaveProperty('activeTeamTotal');
        expect(getAxiosResult).toHaveProperty('rosterHighScores.active.activePlayerHighName');
        expect(getAxiosResult).toHaveProperty('rosterHighScores.active.activePlayerHighScore');
        expect(getAxiosResult).toHaveProperty('rosterHighScores.bench.benchPlayerHighName');
        expect(getAxiosResult).toHaveProperty('rosterHighScores.bench.benchPlayerHighScore');
        expect(getAxiosResult).toHaveProperty('rosterLowScores.active.activePlayerLowName');
        expect(getAxiosResult).toHaveProperty('rosterLowScores.active.activePlayerLowScore');
        expect(getAxiosResult).toHaveProperty('rosterLowScores.bench.benchPlayerLowName');
        expect(getAxiosResult).toHaveProperty('rosterLowScores.bench.benchPlayerLowScore');
        expect(getAxiosResult).toHaveProperty('rosterPostionScores.teamQbTotal');
        expect(getAxiosResult).toHaveProperty('rosterPostionScores.teamRbTotal');
        expect(getAxiosResult).toHaveProperty('rosterPostionScores.teamWrTotal');
        expect(getAxiosResult).toHaveProperty('rosterPostionScores.teamTeTotal');
        expect(getAxiosResult).toHaveProperty('rosterPostionScores.teamKiTotal');
        expect(getAxiosResult).toHaveProperty('rosterPostionScores.teamDeTotal');

      },10000);

    });

  });

});