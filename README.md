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

All results returned wil be JSON formatted.

## Roadmap

*TBD*
