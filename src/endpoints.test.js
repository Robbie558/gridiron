const endpoints = require('./endpoints.js');
const utils = require('./utils/utils.js');

const { BASE_URL, PORT } = require('../config.js');

describe('Cheerio Function Tests', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    const returnAxiosResultMock = jest.spyOn(utils, "returnAxiosResult");
    const leagueIdMock = 2285751;
    const leagueYearMock = 2020;

    describe('yearMetadata', () => {

        let getAxiosResult, mockRes, yearMetadataMock;

        describe('Success - yearMetadata', () => {

            const metaUrl = BASE_URL + leagueIdMock + "/history/" + leagueYearMock + "/schedule" + "?gameSeason=" + leagueYearMock + "&leagueId=" + leagueIdMock + "&scheduleDetail=1" + "&scheduleType=week" + "&standingsTab=schedule";
            yearMetadataMock = jest.spyOn(endpoints, "yearMetadata");

            it('should return an object', async () => {

                mockRes = await yearMetadataMock(metaUrl);
                getAxiosResult = await returnAxiosResultMock(mockRes);

                expect(yearMetadataMock).toHaveBeenCalledWith(`https://fantasy.nfl.com/league/${leagueIdMock}/history/${leagueYearMock}/schedule?gameSeason=${leagueYearMock}&leagueId=${leagueIdMock}&scheduleDetail=1&scheduleType=week&standingsTab=schedule`);
                expect(mockRes).toBeInstanceOf(Object);
                expect(getAxiosResult).toBeInstanceOf(Object);
            }, 10000);
        });

    });

});