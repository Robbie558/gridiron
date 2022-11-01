// Public Functions 
function getTeamUrls(parsedHtml) {
  const parsedClass = parsedHtml(`.teamImageAndNameWrap`);
  let returnArr = [];
  let teamId = 0;
  parsedClass.each(function () {
    const teamName = parsedHtml(this).text();
    const ParsedLink = parsedHtml(this).children().first();
    const TeamUrl = ParsedLink.attr('href');
    returnArr.push({ teamId, teamName, TeamUrl })
    teamId++;
  });
  return returnArr;
}

// TODO - Find a better source for this information
function getLeagueTitle(parsedHtml) {
  const result = parsedHtml(`.title`).first().text();
  return result.replace(/ Home/, ``);
}

function getCurrentWeekScores(parsedHtml) {
  let returnArr = [];
  parsedHtml(`.teamNav`).children('ul').first().children('li').each(function () {
    const matchupTitle = parsedHtml(this).children('a').attr('title');
    const firstOpponentName = parsedHtml(this).children('a').children('.first').children('em').html();
    const firstOpponentScore = parsedHtml(this).children('a').children('.first').children('.teamTotal').html();
    const lastOpponentName = parsedHtml(this).children('a').children('.last').children('em').html();
    const lastOpponentScore = parsedHtml(this).children('a').children('.last').children('.teamTotal').html();
    scores = { firstOpponentName, firstOpponentScore, lastOpponentName, lastOpponentScore };
    matchup = { matchupTitle, scores };
    returnArr.push(matchup);
  });
  return returnArr;
}

function getHistoricWeekScores(parsedHtml) {
  let returnArr = [];
  parsedHtml('.matchup').each(function () {
    const firstTeamName = parsedHtml(this).children('.teamWrap-1').children('a').text();
    const firstTeamOwner = parsedHtml(this).children('.teamWrap-1').children().children().children().children('a').text();
    const firstTeamScore = parsedHtml(this).children('.teamWrap-1').children('.teamTotal').html();
    const lastTeamName = parsedHtml(this).children('.teamWrap-2').children('a').text();
    const lastTeamOwner = parsedHtml(this).children('.teamWrap-2').children().children().children().children('a').text();
    const lastTeamScore = parsedHtml(this).children('.teamWrap-2').children('.teamTotal').html();
    const matchupTitle = firstTeamName + ' vs ' + lastTeamName;
    let matchupWinner = `${firstTeamName} (${firstTeamOwner})`
    if (parseFloat(lastTeamScore) > parseFloat(firstTeamScore)) {
      matchupWinner = `${lastTeamName} (${lastTeamOwner})`
    }
    scores = { firstTeamName, firstTeamOwner, firstTeamScore, lastTeamName, lastTeamOwner, lastTeamScore };
    matchup = { matchupTitle, matchupWinner, scores };
    returnArr.push(matchup)
  })
  return returnArr;
}

function getHistoricWeekTeamAnalysis(parsedHtml) {
  let rosteredPlayerName;
  let rosteredPlayerWeekScore;
  let teamActiveTotal = 0, teamBenchTotal = 0;
  let teamQbTotal = 0, teamRbTotal = 0 , teamWrTotal = 0, teamTeTotal = 0, teamKiTotal = 0, teamDeTotal = 0;
  let teamPlayerHighScore = 0;
  let teamName = parsedHtml(`.selecter-selected`).children(`.label`).text();
  let teamOwner = parsedHtml(`.owners`).children(`li`).children().text();
  parsedHtml('.tableType-player').children(`tbody`).children(`tr`).each(function () {
    rosteredPlayerPosition = parsedHtml(this).children(`.teamPosition`).children(`.final`).text();
    rosteredPlayerName = parsedHtml(this).children(`.playerNameAndInfo`).children(`div`).children(`a`).text();
    rosteredPlayerWeekScore = parseFloat(parsedHtml(this).children(`.stat`).children(`.playerTotal`).text());
    if (/^BN/.test(rosteredPlayerPosition)) {
      teamBenchTotal += rosteredPlayerWeekScore;  
    } else {
      if (rosteredPlayerWeekScore) teamActiveTotal += rosteredPlayerWeekScore;
      const playerPositionTeam = parsedHtml(this).children(`.playerNameAndInfo`).children().children(`em`).text();
      if (/^QB/.test(playerPositionTeam))       teamQbTotal += rosteredPlayerWeekScore;
      else if (/^RB/.test(playerPositionTeam))  teamRbTotal += rosteredPlayerWeekScore;
      else if (/^WR/.test(playerPositionTeam))  teamWrTotal += rosteredPlayerWeekScore;
      else if (/^TE/.test(playerPositionTeam))  teamTeTotal += rosteredPlayerWeekScore;
      else if (/^K/.test(playerPositionTeam))   teamKiTotal += rosteredPlayerWeekScore;
      else if (/^DEF/.test(playerPositionTeam)) teamDeTotal += rosteredPlayerWeekScore;
      if (rosteredPlayerWeekScore > teamPlayerHighScore ){
        teamPlayerHighScore = rosteredPlayerWeekScore;
        teamPlayerName = rosteredPlayerName;
      }
    }
  });
  const returnObj = { teamName, teamOwner, teamBenchTotal, teamActiveTotal, rosterHighScore:{teamPlayerName, teamPlayerHighScore}, rosterPostionScores:{teamQbTotal, teamRbTotal, teamWrTotal, teamTeTotal, teamKiTotal, teamDeTotal} };
  return returnObj;
}

function getweeksInYear(parsedHtml) {
  let weekArr = [];
  const weekList = parsedHtml(`.scheduleWeekNav`).children().children();
  weekList.each(function () {
    if (parsedHtml(this).children('.title').html() != null) {
      weekArr.push(parsedHtml(this).children('.title').text());
    }
  });
  return weekArr.length;
}

function getPlayoffWeeks(parsedHtml) {
  let returnArr = [];
  const playoffWeekList = parsedHtml(`.weekLabels`).children('ul').children('li');
  playoffWeekList.each(function () {
    returnArr.push(parsedHtml(this).text().replace(/\D/g, ""))
  });
  return returnArr;
}

function getYearLeagueSettings(parsedHtml) {
  let teamCount, commissioner, draftFormat, draftType;
  parsedHtml(`.formItems`).children(`li`).each(function () {
    if (/^Commissioner.*/.test(parsedHtml(this).text())) {
      commissioner = parsedHtml(this).children(`div`).text();
    }
    if (/^Draft Type.*/.test(parsedHtml(this).text())) {
      draftType = parsedHtml(this).children(`div`).text();
    }
    if (/^Draft Format.*/.test(parsedHtml(this).text())) {
      draftFormat = parsedHtml(this).children(`div`).text();
    }
    if (/^Teams.*/.test(parsedHtml(this).text())) {
      teamCount = parsedHtml(this).children(`div`).text();
    }
  });
  return { teamCount, commissioner, draftFormat, draftType };
}

function getYearRosterSettings(parsedHtml) {
  let returnArr = [];
  parsedHtml(`.positionsAndRoster`).children(`li`).each(function () {
    const rosterPostion = parsedHtml(this).children(`em`).html();
    const rosterLimit = parsedHtml(this).children(`.value`).html();
    returnArr.push({ rosterPostion, rosterLimit })
  });
  return returnArr;
}

function getHistoricFinalStandings(parsedHtml) {
  let returnArr = [];
  const standingsList = parsedHtml(`.results`).children().children(`li`);
  standingsList.each(function () {
    let teamRank = parsedHtml(this).children(`.place`).html();
    teamRank = teamRank.replace(/[a-z].*/, ``);
    const teamName = parsedHtml(this).children(`.value`).children().first().html();
    const teamUrl = parsedHtml(this).children(`.value`).children().first().attr(`href`);
    returnArr.push({ teamRank, teamName, teamUrl });
  });
  return returnArr;
}

function getHistoricRegularStandings(parsedHtml) {
  let returnArr = [];
  const standingsList = parsedHtml(`.tableType-team`).children(`tbody`).children();
  standingsList.each(function () {
    const teamRank = parsedHtml(this).children(`.teamRank`).children(`.teamRank`).text();
    const teamName = parsedHtml(this).children(`.teamImageAndName`).children(`.teamImageAndNameWrap`).children(`.teamImg`).children().attr(`alt`);
    const teamRecord = parsedHtml(this).children(`.teamRecord`).text();
    const teamWinPercent = parsedHtml(this).children(`.teamWinPct`).text();
    const teamStreak = parsedHtml(this).children(`.teamStreak`).text();
    const teamPtsFor = parsedHtml(this).children(`.teamPts`).first().text();
    const teamPtsAgainst = parsedHtml(this).children(`.teamPts`).last().text();
    returnArr.push({ teamRank, teamName, teamRecord, teamWinPercent, teamStreak, teamPtsFor, teamPtsAgainst });
  });
  return returnArr;
}

function getHistoricPlayoffs(parsedHtml) {
  let returnArr = [];
  //Week
  parsedHtml(`.playoffContent`).children().each(function () {
    //Matchup
    let playoffWeek = parsedHtml(this).children(`h4`).text();
    let matchupArr = [];
    parsedHtml(this).children(`ul`).children(`li`).each(function () {
      const matchupName = parsedHtml(this).children(`h5`).text();
      let matchupType = "Bye";
      let matchupWinner = "";
      //Teams
      let teamArr = [];
      parsedHtml(this).children(`.teamsWrap`).children(`.teamWrap`).each(function () {
        const playoffTeamName = parsedHtml(this).children(`.nameWrap`).children(`a`).text();
        const playoffTeamSeed = parsedHtml(this).children(`.nameWrap`).children(`span`).text();
        let playoffTeamScore = parsedHtml(this).children(`div`).last().text();
        if (playoffTeamName != "") {
          if (/^[0-9]{2}.*/.test(playoffTeamScore)) {
            matchupType = "H2H";
          } else {
            playoffTeamScore = "N/A"
          }
          let teamResult = { playoffTeamName, playoffTeamSeed, playoffTeamScore }
          teamArr.push(teamResult);
        }
      });
      // Identify Winner based on scores
      if (teamArr[0]) {
        matchupWinner = teamArr[0].playoffTeamName;
      }
      if (teamArr[1]) {
        if (parseFloat(teamArr[1].playoffTeamScore) > parseFloat(teamArr[0].playoffTeamScore)) {
          matchupWinner = teamArr[1].playoffTeamName;
        }
      }
      let matchup = { matchupType, matchupName, matchupWinner, teamArr };
      if (teamArr.length != 0) {
        matchupArr.push(matchup);
      }
    });
    returnArr.push({ playoffWeek, matchupArr });
  });
  return returnArr;
}

module.exports = {
  getTeamUrls,
  getLeagueTitle,
  getCurrentWeekScores,
  getHistoricWeekScores,
  getHistoricFinalStandings,
  getHistoricRegularStandings,
  getHistoricWeekTeamAnalysis,
  getHistoricPlayoffs,
  getweeksInYear,
  getPlayoffWeeks,
  getYearRosterSettings,
  getYearLeagueSettings
}