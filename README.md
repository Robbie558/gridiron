# GridIron

An API layer for interacting with an official American football fantasy league

<img src="./images/johnny_football.jpg" width="300" height="300" /> 


## How to Run

### Locally

```bash
npm install -g nodemon 
npm i
npm start
```

#### Docker

```bash
docker build --build-arg EXPOSE_PORT=<container_port> -t <tag> -f Dockerfile 
docker run -p 127.0.0.1:<local_port>:<container_port> <tag>:latest npm start
```

**Note**: The `<container_port>` specified must match the `PORT` set within the the `config.js`.

## Usage 
You can then issue API requests aginst the following endpoints, all of which return results as JSON:

### Teams
Retrieve a list of all the teams involved in a given league for a give year (season).

```bash
http://localhost:<port>/api/<league_id>/teams

```

### Week by Week Scores

Retrieve the current week scores for all matches in a given fantasy league:
```bash
curl -X GET http://localhost:<port>/api/<league_id>/scores
 
```

Retrieve historic scores for a week within a year for all matchups in a given fantasy league:
```bash
curl -X GET http://localhost:<port>/api/<league_id>/scores/<year>/<week>
```

### Metadata 

Retrieve the current teams in a given fantasy league:
```bash
curl -X GET http://localhost:<port>/api/<league_id>/teams

```

Retrieve metadata for a given year of a fantasy league (Roster Configuration, Season Length, Play Period):
```bash
curl -X GET http://localhost:<port>/api/<league_id>/metadata/<year>
```

### Results

Retrieve the end of playoffs or end of regular season standings for a given year of a fantasy league:
```bash
http://localhost:<port>/api/<league_id>/standings/<year>/<standing_type>
```
`standing_type` should be given as either `final` or `regular`, to show the end of year (after playoffs resolved) or end of season standings respectively.


Retrieve playoff results for either the championship or consolation rounds for a given year of a fantasy league:
```bash
curl -X GET http://localhost:<port>/api/<league_id>/playoffs/<year>/<playoff_bracket>
```
`playoff_bracket` should be given as either `championship` or `consolation`, to show the leagues Superb Owl results or the leagues Toilet Bowl results (grouped by week). 

### Week Analysis

Retrieve stats on a given teams performance within a league for a historical week of a year. 

```bash
http://localhost:<port>/api/<league_id>/week_analysis/<team_id>/<year>/<week_number>

```
The `team_id` can be retrieved with the [Teams](#teams) endpoint.

Statistic returned include:
* `teamName` - The name of the team duing that week
* `teamOwner` - The first name of team owner. 
* `benchTeamTotal` - The total score of all players in bench slot.
* `activeTeamTotal` - The total score of all players in active slots.
* `rosterHighScores.active.activePlayerHighName` - The name of the player with the highest score in any of the active slots. 
* `rosterHighScores.active.activePlayerHighScore`  - The highest score recorded for a player in any of the active slots. 
* `rosterHighScores.bench.benchPlayerHighName` - The name of the player with the highest score on the bench.
* `rosterHighScores.bench.benchPlayerHighScore` - The highest score recorded for a player on the bench.
* `rosterLowScores.active.activePlayerLowName` - The name of the player with the lowest score in any of the active slots.
* `rosterLowScores.active.activePlayerLowScore` - The lowest score recorded for a player in any of the active slots. 
* `rosterLowScores.bench.benchPlayerLowName` - The name of the player with the lowest score on the bench.
* `rosterLowScores.bench.benchPlayerLowScore` - The lowest score recorded for a player on the bench.
* `rosterPostionScores.<position_identifier>` - The total points scored in a week by position.  Postions detail are; Quaterback, Running Back, Wide Receiver, Tight End, Kicker and Defense.

### Year Analysis

Retrieve stats on a given teams performance within a league for a historical year. 

```bash
http://localhost:<port>/api/<league_id>/year_analysis/<team_id>/<year>

```
The `team_id` can be retrieved with the [Teams](#teams) endpoint.

Statistic returned include:
* `teamName` - The name of the team duing that week
* `teamOwner` - The first name of team owner. 
* `benchTeamTotal` - The total score of all players in bench slot.
* `activeTeamTotal` - The total score of all players in active slots.
* `rosterHighScores.active.week.activeHighScore`  - The highest total score of all active slots on the given team during that year.
* `rosterHighScores.active.week.activeHighsWeek` -  The week of the highest total score of all active slots on the given team during that year.
* `rosterHighScores.active.player.activeHighestScore` - The highest score recorded for any active player on the given team in any of the active slots during that year.
* `rosterHighScores.active.player.activeHighestName` - The name of the player with the highest score on the given team in any of the active slots during that year.  
* `rosterHighScores.bench.week.benchHighScore`  - The highest total score of all bench slots on the given team during that year.
* `rosterHighScores.bench.week.benchHighWeek` -  The week of the highest total score of all bench slots on the given team during that year.
* `rosterHighScores.bench.player.benchHighestScore` - The highest score recorded for any player on the given team in any of the becnh slots during that year.
* `rosterHighScores.bench.player.benchHighestName` - The name of the player with the highest score on the given team in any of the bench slots during that year.  
## Roadmap

* Top / Bottom 10 performances of year - ???
* Bench Points per historic week - include per-player breakdown 
* Undrafted Player Top 10 per week - ???