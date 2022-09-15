// Public Functions 
function getTeamLinks(parsedHtml) {
  const parsedClass = parsedHtml(`.teamImageAndNameWrap`);
  let arr = [];
  let teamId = 0;
  parsedClass.each(function () {
    const teamName = parsedHtml(this).text();
    const ParsedLink = parsedHtml(this).children().first();
    const teamLink = ParsedLink.attr('href');
    arr.push({
      teamId,
      teamName,
      teamLink
    })
    teamId++;
  });
  return arr;
}

function getLeagueTitle(parsedHtml) {
  const parsedClass = parsedHtml(`.title`);
  let arr = [];
  parsedClass.each(function () {
    const text = parsedHtml(this).text();
    const ParsedLink = parsedHtml(this).children().first();
    const attrClass = ParsedLink.attr('class');
    arr.push({
      text,
      attrClass
    })
  });
  return arr;
}

function getCurrentWeekScores(parsedHtml) {
  let arr = [];
  parsedHtml(`.teamNav`).children('ul').first().children('li').each(function (i, e) {
    let scores = [], matchup = [];
    const matchupTitle = parsedHtml(this).children('a').attr('title');
    const firstOpponentName = parsedHtml(this).children('a').children('.first').children('em').html();
    const firstOpponentScore = parsedHtml(this).children('a').children('.first').children('.teamTotal').html();
    const lastOpponentName = parsedHtml(this).children('a').children('.last').children('em').html();
    const lastOpponentScore = parsedHtml(this).children('a').children('.last').children('.teamTotal').html();
    scores.push({ firstOpponentName, firstOpponentScore, lastOpponentName, lastOpponentScore });
    matchup.push({ matchupTitle, scores });
    arr.push({ matchup });
  });
  return arr;
}

function getTeamNames(parsedHtml) {
  let teamArr = [];
  const parsedClass = parsedHtml(`.scheduleContent`);
  const teams = parsedClass.children().children().children().children().children();
  teams.each(function () {
    let class_attrib = JSON.stringify(this.attribs);
    if (/teamName teamId-[0-9]/.test(class_attrib)) {
      const teamName = parsedHtml(this).text();
      let team = { "Name": teamName };
      teamArr.push(team);
    }
  });
  return teamArr;
}

function getHistoricWeekScores(parsedHtml) {
  let arr = [];
  parsedHtml('.matchup').each(function (i, e) {
    let scores = [], matchup = [];
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
    scores.push({
      firstTeamName,
      firstTeamOwner,
      firstTeamScore,
      secondTeamName,
      secondTeamOwner,
      secondTeamScore
    })
    matchup.push({ matchupTitle, matchupWinner, scores });
    arr.push({ matchup })
  })
  return arr;
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

function getYearRosterSettings(parsedHtml) {
  let returnArr = [];
  const rosterList = parsedHtml(`.positionsAndRoster`).children(`li`);
  rosterList.each(function () {
    const rosterPostion = parsedHtml(this).children(`em`).html();
    const rosterLimit = parsedHtml(this).children(`.value`).html();
    let roster = {rosterPostion,rosterLimit }
    returnArr.push(roster)
  });
  return returnArr;
}


module.exports = {
  getTeamLinks,
  getLeagueTitle,
  getCurrentWeekScores,
  getHistoricWeekScores,
  getweeksInYear,
  getPlayoffWeeks,
  getYearRosterSettings
}