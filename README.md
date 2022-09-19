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

### Docker

```bash
docker build --build-arg EXPOSE_PORT=<container_port> -t <tag> -f Dockerfile 
docker run -p 127.0.0.1:<local_port>:<container_port> <tag>:latest npm start
```

**Note**: The `<container_port>` specified must match the `PORT` set within the the `config.js`.

## Usage 
You can then issue API requests aginst the following endpoints:

Retrieving the current week scores for a given fantasy league:

```bash
curl -X GET http://localhost:8080/api/<league_id>/scores
 
```

Retrieving the current teams in a given fantasy league:
```bash
curl -X GET http://localhost:8080/api/<league_id>/teams

```

Retrieving historic week scores for all matchups in a given fantasy league:
```bash
curl -X GET http://localhost:8080/api/<league_id>/<year>/scores/<week>
```

Retrieving metadata for a given year of a fantasy league (Roster Configuration, Season Length, Play Period):
```bash
curl -X GET http://localhost:8080/api/<league_id>/<year>/metadata
```

Retrieving metadata for a given year of a fantasy league (Roster Configuration, Season Length, Play Period):
```bash
curl -X GET http://localhost:8080/api/<league_id>/<year>/metadata
```

All results returned wil be JSON formatted.

## Roadmap

* Final Year End Standings - https://fantasy.nfl.com/league/2285751/history/2020/standings
* Regular Season Year End Standings - https://fantasy.nfl.com/league/2285751/history/2021/standings?historyStandingsType=regular
* Toilet Bowl - https://fantasy.nfl.com/league/2285751/history/2020/playoffs?bracketType=consolation&standingsTab=playoffs
* Champ Bowl - https://fantasy.nfl.com/league/2285751/history/2020/playoffs?bracketType=championship&standingsTab=playoffs
* Bench Points per historic week - https://fantasy.nfl.com/league/2285751/history/2020/teamhome?statCategory=stats&statSeason=2020&statType=weekStats&statWeek=1&teamId=11&week=1
