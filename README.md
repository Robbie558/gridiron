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

### Week by Week Scores

Retrieve the current week scores for all matches in a given fantasy league:
```bash
curl -X GET http://localhost:8080/api/<league_id>/scores
 
```

Retrieve historic scores for a week within a year for all matchups in a given fantasy league:
```bash
curl -X GET http://localhost:8080/api/<league_id>/<year>/scores/<week>
```

### Metadata 

Retrieve the current teams in a given fantasy league:
```bash
curl -X GET http://localhost:8080/api/<league_id>/teams

```

Retrieve metadata for a given year of a fantasy league (Roster Configuration, Season Length, Play Period):
```bash
curl -X GET http://localhost:8080/api/<league_id>/<year>/metadata
```

### Results

Retrieve the end of playoffs or end of regular season standings for a given year of a fantasy league:
```bash
http://localhost:8080/api/<league_id>/<year>/standings/<standing_type>
```
`standing_type` should be given as either `final` or `regular`, to show the end of year (after playoffs resolved) or end of season standings respectively.


Retrieve playoff results for either the championship or consolation rounds for a given year of a fantasy league:
```bash
curl -X GET http://localhost:8080/api/<league_id>/<year>/playoffs/<playoff_bracket>
```
`playoff_bracket` should be given as either `championship` or `consolation`, to show the leagues Superb Owl results or the leagues Toilet Bowl results (grouped by week.) 


## Roadmap

* Top / Bottom 10 performances of year - ???
* Bench Points per historic week - https://fantasy.nfl.com/league/2285751/history/2020/teamhome?statCategory=stats&statSeason=2020&statType=weekStats&statWeek=1&teamId=11&week=1
* Historical Week Standings - ???
* Undrafted Player Top 10 per week - ???