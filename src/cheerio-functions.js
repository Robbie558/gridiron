// Public Functions 
function getTeamLinks(parsedHtml) {
  const parsedClass = parsedHtml(`.teamImageAndNameWrap`);
  let returnArr = [];
  let teamId = 0;
  parsedClass.each(function () {
    const teamName = parsedHtml(this).text();
    const ParsedLink = parsedHtml(this).children().first();
    const teamLink = ParsedLink.attr('href');
    returnArr.push({ teamId, teamName, teamLink })
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
    const secondTeamName = parsedHtml(this).children('.teamWrap-2').children('a').text();
    const secondTeamOwner = parsedHtml(this).children('.teamWrap-2').children().children().children().children('a').text();
    const secondTeamScore = parsedHtml(this).children('.teamWrap-2').children('.teamTotal').html();
    const matchupTitle = firstTeamName + ' vs ' + secondTeamName;
    let matchupWinner = `${firstTeamName} (${firstTeamOwner})`
    if (parseFloat(secondTeamScore) > parseFloat(firstTeamScore)) {
      matchupWinner = `${secondTeamName} (${secondTeamOwner})`
    }
    scores = { firstTeamName, firstTeamOwner, firstTeamScore, secondTeamName, secondTeamOwner, secondTeamScore };
    matchup = { matchupTitle, matchupWinner, scores };
    returnArr.push(matchup)
  })
  return returnArr;
}

function getHistoricTeamWeekBenchTotalPoints(parsedHtml) {
  let returnArr = [];
  let rosteredPlayerName;
  let rosteredPlayerWeekScore;
  let teamBenchTotal = 0;
  let teamName = parsedHtml(`.selecter-selected`).children(`.label`).text();
  let teamOwner = parsedHtml(`.owners`).children(`li`).children(`a`).text();
  parsedHtml('.tableType-player').children(`tbody`).children(`tr`).each(function () {
    rosteredPlayerPosition = parsedHtml(this).children(`.teamPosition`).children(`.final`).text();
    rosteredPlayerName = parsedHtml(this).children(`.playerNameAndInfo`).children(`div`).children(`a`).text();
    rosteredPlayerWeekScore = parsedHtml(this).children(`.stat`).children(`.playerTotal`).text();
    if (/^BN/.test(rosteredPlayerPosition)) {
      teamBenchTotal += parseFloat(rosteredPlayerWeekScore);
    }
  });
  returnArr.push({teamName, teamOwner, teamBenchTotal})
  return returnArr;
}

function getweeksInYear(parsedHtml) {
  let returnArr = [];
  const weekList = parsedHtml(`.scheduleWeekNav`).children().children();
  weekList.each(function () {
    if (parsedHtml(this).children('.title').html() != null) {
      returnArr.push(parsedHtml(this).children('.title').text());
    }
  });
  return returnArr;
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
  let leagueTeamCount = 0;
  parsedHtml(`.settingsContent`).children(`ul`).children(`li`).each(function () {
    if (/^Teams.*/.test(parsedHtml(this).text()) ) {
      leagueTeamCount = parsedHtml(this).children(`div`).text();
    }
  });
  return {leagueTeamCount};
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
      if (teamArr[0]){
        matchupWinner = teamArr[0].playoffTeamName;
      }
      if (teamArr[1]) {
        if (parseFloat(teamArr[1].playoffTeamScore) > parseFloat(teamArr[0].playoffTeamScore)) {
          matchupWinner = teamArr[1].playoffTeamName;
        }
      }
      let matchup = { matchupType, matchupName, matchupWinner, teamArr };
      if(teamArr.length != 0){
        matchupArr.push(matchup);
      }
    });
    returnArr.push({playoffWeek, matchupArr});
  });
  return returnArr;
}

module.exports = {
  getTeamLinks,
  getLeagueTitle,
  getCurrentWeekScores,
  getHistoricWeekScores,
  getHistoricFinalStandings,
  getHistoricRegularStandings,
  getHistoricTeamWeekBenchTotalPoints,
  getHistoricPlayoffs,
  getweeksInYear,
  getPlayoffWeeks,
  getYearRosterSettings,
  getYearLeagueSettings
}