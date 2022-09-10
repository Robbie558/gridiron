const { yearTopScores, leagueListTeams, currentWeekListScores, historicalWeekListScore, health } = require('./endpoints.js');

describe('Endpoint Tests', () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('leagueListTeams', () => {
    const mockResponse = [
      {
        teamId: 0,
        teamName: 'Team Name 0',
        teamLink: '/league/0000000/team/1'
      },
      {
        teamId: 1,
        teamName: 'Team Name 1',
        teamLink: '/league/0000000/team/2'
      },
      {
        teamId: 2,
        teamName: "Team Name 2",
        teamLink: '/league/0000000/team/3'
      },
      {
        teamId: 3,
        teamName: 'Team Name 3',
        teamLink: '/league/0000000/team/4'
      },
      {
        teamId: 4,
        teamName: "Team Name 4",
        teamLink: '/league/0000000/team/5'
      },
      {
        teamId: 5,
        teamName: 'Team Name 5',
        teamLink: '/league/0000000/team/6'
      },
      {
        teamId: 6,
        teamName: 'Team Name 6',
        teamLink: '/league/0000000/team/7'
      },
      {
        teamId: 7,
        teamName: 'Team Name 7',
        teamLink: '/league/0000000/team/8'
      },
      {
        teamId: 8,
        teamName: 'Team Name 8',
        teamLink: '/league/0000000/team/9'
      },
      {
        teamId: 9,
        teamName: 'Team Name 9',
        teamLink: '/league/0000000/team/10'
      },
      {
        teamId: 10,
        teamName: 'Team Name 10',
        teamLink: '/league/0000000/team/11'
      },
      {
        teamId: 11,
        teamName: 'Team Name 11',
        teamLink: '/league/0000000/team/12'
      }
    ];

    const expected = [{
      teamId: 0,
      teamName: 'Team Name 0',
      teamLink: '/league/0000000/team/1'
    }];
    const mock = jest
      .fn()
      .mockName('mockleagueListTeams')
      .mockReturnValueOnce(mockResponse);

    const mockLeagueUrl = 'https://fantasy.nfl.com/league/0000000';
    const mockRes = {};
    const mockleagueListTeams = mock(mockLeagueUrl, mockRes);

    it('should return an array of objects', async () => {
      expect(mock).toHaveBeenCalledTimes(1);
      expect(mock).toHaveBeenCalledWith('https://fantasy.nfl.com/league/0000000', {});
      expect(mockleagueListTeams).toBeDefined();
      expect(mockleagueListTeams).toBeInstanceOf(Array);
      expect(mockleagueListTeams).toHaveLength(12); // TODO - Link to number of players in leage
    });

    it('with expected properties', async () => {
      expect(mockleagueListTeams[0]).toHaveProperty('teamId', 'teamName', 'teamLink');
      expect(mockleagueListTeams).toEqual(expect.arrayContaining(expected));
    });

    // TODO
    // it('verified against live reponse', async () => {
    //   const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: '<div>teresa teng</div>' });
    //   const actual = app.get(`/api/:league_id/teams`, (req,res) => leagueListTeams(req,res));
    //   expect(actual).toEqual('<div>teresa teng</div>');
    //   expect(getSpy).toBeCalledWith('http://localhost:8080');
    // });

  });

  describe('currentWeekListScores', () => {

    const expected = [
      {
        "matchup": [
          {
            "matchupTitle": "Team 1 vs. Team 2",
            "scores": [
              {
                "firstOpponentName": "Team 1",
                "firstOpponentScore": "31.48",
                "lastOpponentName": "Team 2",
                "lastOpponentScore": "0.00"
              }
            ]
          }
        ]
      },
    ];
    const mockResponse = [
      {
        "matchup": [
          {
            "matchupTitle": "Team 1 vs. Team 2",
            "scores": [
              {
                "firstOpponentName": "Team 1",
                "firstOpponentScore": "31.48",
                "lastOpponentName": "Team 2",
                "lastOpponentScore": "0.00"
              }
            ]
          }
        ]
      },
      {
        "matchup": [
          {
            "matchupTitle": "Team 3 vs. Team 4",
            "scores": [
              {
                "firstOpponentName": "Team 3",
                "firstOpponentScore": "17.00",
                "lastOpponentName": "Team 4",
                "lastOpponentScore": "0.00"
              }
            ]
          }
        ]
      },
      {
        "matchup": [
          {
            "matchupTitle": "Team 5 vs. Team 6",
            "scores": [
              {
                "firstOpponentName": "Team 5",
                "firstOpponentScore": "25.30",
                "lastOpponentName": "Team 6",
                "lastOpponentScore": "0.00"
              }
            ]
          }
        ]
      },
      {
        "matchup": [
          {
            "matchupTitle": "Team 7 vs. Team 8",
            "scores": [
              {
                "firstOpponentName": "Team 7",
                "firstOpponentScore": "7.80",
                "lastOpponentName": "Team 8",
                "lastOpponentScore": "6.40"
              }
            ]
          }
        ]
      },
      {
        "matchup": [
          {
            "matchupTitle": "Team 9 vs. Team 10",
            "scores": [
              {
                "firstOpponentName": "Team 9",
                "firstOpponentScore": "22.80",
                "lastOpponentName": "Team 10",
                "lastOpponentScore": "22.20"
              }
            ]
          }
        ]
      },
      {
        "matchup": [
          {
            "matchupTitle": "Team 11 vs. Team 12",
            "scores": [
              {
                "firstOpponentName": "Team 11",
                "firstOpponentScore": "1.00",
                "lastOpponentName": "Team 12",
                "lastOpponentScore": "7.00"
              }
            ]
          }
        ]
      }
    ];

    const mock = jest
      .fn()
      .mockName('mockCurrentWeekListScores')
      .mockReturnValueOnce(mockResponse);

    const mockLeagueUrl = 'https://fantasy.nfl.com/league/0000000';
    const mockRes = {};
    const mockCurrentWeekListScores = mock(mockLeagueUrl, mockRes);

    it('should return an array of objects', async () => {
      expect(mock).toHaveBeenCalledTimes(1);
      expect(mock).toHaveBeenCalledWith('https://fantasy.nfl.com/league/0000000', {});
      expect(mockCurrentWeekListScores).toBeDefined();
      expect(mockCurrentWeekListScores).toBeInstanceOf(Array);
      expect(mockCurrentWeekListScores).toHaveLength(6); // TODO - Link to number of players in leage
    });

    it('with expected properties', async () => {
      expect(mockCurrentWeekListScores[0]).toHaveProperty('matchup');
      expect(mockCurrentWeekListScores[0].matchup[0]).toHaveProperty('matchupTitle');
      expect(mockCurrentWeekListScores[0].matchup[0].scores[0]).toHaveProperty('firstOpponentName', 'firstOpponentScore', 'lastOpponentName', 'lastOpponentScore');
      expect(mockCurrentWeekListScores).toEqual(expect.arrayContaining(expected));
    });

    // TODO
    // it('verified against live reponse', async () => {
    //   const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: '<div>teresa teng</div>' });
    //   const actual = app.get(`/api/:league_id/teams`, (req,res) => leagueListTeams(req,res));
    //   expect(actual).toEqual('<div>teresa teng</div>');
    //   expect(getSpy).toBeCalledWith('http://localhost:8080');
    // });

  });

  describe('historicalWeekListScore', () => {

    const expected = [
      {
        "matchup": [
          {
            "matchupTitle": "Team 1 vs Team 2",
            "scores": [
              {
                "firstTeamName": "Team 1",
                "firstTeamOwner": "Owner 1",
                "firstTeamScore": "124.52",
                "secondTeamName": "Team 2",
                "secondTeamOwner": "Owner 2",
                "secondTeamScore": "89.28"
              }
            ]
          }
        ]
      }
    ];
    const mockResponse = [
      {
        "matchup": [
          {
            "matchupTitle": "Team 1 vs Team 2",
            "scores": [
              {
                "firstTeamName": "Team 1",
                "firstTeamOwner": "Owner 1",
                "firstTeamScore": "124.52",
                "secondTeamName": "Team 2",
                "secondTeamOwner": "Owner 2",
                "secondTeamScore": "89.28"
              }
            ]
          }
        ]
      },
      {
        "matchup": [
          {
            "matchupTitle": "Team 3 vs Team 4",
            "scores": [
              {
                "firstTeamName": "Team 3",
                "firstTeamOwner": "Owner 3",
                "firstTeamScore": "115.60",
                "secondTeamName": "Team 4",
                "secondTeamOwner": "Owner 4",
                "secondTeamScore": "90.80"
              }
            ]
          }
        ]
      },
      {
        "matchup": [
          {
            "matchupTitle": "Team 5 vs Team 6",
            "scores": [
              {
                "firstTeamName": "Team 5",
                "firstTeamOwner": "Owner 5",
                "firstTeamScore": "125.52",
                "secondTeamName": "Team 6",
                "secondTeamOwner": "Owner 6",
                "secondTeamScore": "130.80"
              }
            ]
          }
        ]
      },
      {
        "matchup": [
          {
            "matchupTitle": "Team 7 vs Team 8",
            "scores": [
              {
                "firstTeamName": "Team 7",
                "firstTeamOwner": "Owner 7",
                "firstTeamScore": "118.10",
                "secondTeamName": "Team 8",
                "secondTeamOwner": "Owner 8",
                "secondTeamScore": "126.48"
              }
            ]
          }
        ]
      },
      {
        "matchup": [
          {
            "matchupTitle": "Team 9 vs Team 10",
            "scores": [
              {
                "firstTeamName": "Team 9",
                "firstTeamOwner": "Owner 9",
                "firstTeamScore": "116.20",
                "secondTeamName": "Team 10",
                "secondTeamOwner": "Owner 10",
                "secondTeamScore": "96.74"
              }
            ]
          }
        ]
      },
      {
        "matchup": [
          {
            "matchupTitle": "Team 11 vs Team 12",
            "scores": [
              {
                "firstTeamName": "Team 11",
                "firstTeamOwner": "Owner 11",
                "firstTeamScore": "147.56",
                "secondTeamName": "Team 12",
                "secondTeamOwner": "Owner 12",
                "secondTeamScore": "99.00"
              }
            ]
          }
        ]
      }
    ];

    const mock = jest
      .fn()
      .mockName('mockhistoricalWeekListScore')
      .mockReturnValueOnce(mockResponse);

    const mockLeagueUrl = 'https://fantasy.nfl.com/league/league_id/history/year/schedule?gameSeason=year&leagueId=league_id&scheduleDetail=week_number&scheduleType=week&standingsTab=schedule';
    const mockRes = {};
    const mockhistoricalWeekListScore = mock(mockLeagueUrl, mockRes);

    it('should return an array of objects', async () => {
      expect(mock).toHaveBeenCalledTimes(1);
      expect(mock).toHaveBeenCalledWith('https://fantasy.nfl.com/league/league_id/history/year/schedule?gameSeason=year&leagueId=league_id&scheduleDetail=week_number&scheduleType=week&standingsTab=schedule', {});
      expect(mockhistoricalWeekListScore).toBeDefined();
      expect(mockhistoricalWeekListScore).toBeInstanceOf(Array);
      expect(mockhistoricalWeekListScore).toHaveLength(6);  // TODO - Link to number of players in leage
    });

    it('with expected properties', async () => {
      expect(mockhistoricalWeekListScore[0]).toHaveProperty('matchup');
      expect(mockhistoricalWeekListScore[0].matchup[0]).toHaveProperty('matchupTitle');
      expect(mockhistoricalWeekListScore[0].matchup[0].scores[0]).toHaveProperty('firstTeamName', 'firstTeamOwner', 'firstTeamScore', 'secondTeamName', 'secondTeamOwner', 'secondTeamScore');
      expect(mockhistoricalWeekListScore).toEqual(expect.arrayContaining(expected));
    });

    // TODO
    // it('verified against live reponse', async () => {
    //   const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: '<div>teresa teng</div>' });
    //   const actual = app.get(`/api/:league_id/teams`, (req,res) => leagueListTeams(req,res));
    //   expect(actual).toEqual('<div>teresa teng</div>');
    //   expect(getSpy).toBeCalledWith('http://localhost:8080');
    // });

  });


});