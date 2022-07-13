//getting the DOM elements
var elapsedTime = document.querySelector("#elapsed");
var homeTeamImage = document.querySelector("#homeLogo");
var homeTeamName = document.querySelector("#homeName");
var awayTeamImage = document.querySelector("#awayLogo");
var awayTeamName = document.querySelector("#awayName");
var lastMatchGoal = document.querySelector("#goals");
var matchTable = document.querySelector("#matchTable");
//the functions to create an element
function addMatchTile(data){
//createing the tile div
    var matchtile = document.createElement('div');
    matchtile.classList.add("match-tile");
//creating the home match box
    var homeTeam = document.createElement('div');
    homeTeam.classList.add("team");
//creating the image and the text
    var homeTileTeamName = document.createElement('p');
    homeTileTeamName.innerHTML = data['teams']['home']['name'];
    var homeTileTeamLogo = document.createElement('img');
    homeTileTeamLogo.src=data['teams']['home']['logo'];
    homeTeam.appendChild(homeTileTeamLogo);
    homeTeam.appendChild(homeTileTeamName);
    var awayTeam = document.createElement('div');
    awayTeam.classList.add("team");
//creating the image and the text
    var awayTileTeamName = document.createElement('p');
    awayTileTeamName.innerHTML = data['teams']['away']['name'];
    var awayTileTeamLogo = document.createElement('img');
    awayTileTeamLogo.src=data['teams']['away']['logo'];
    awayTeam.appendChild(awayTileTeamLogo);
    awayTeam.appendChild(awayTileTeamName);
//createing the score
    var score = document.createElement('p');
    score.innerHTML = data['goals']['home'] + " - " + data['goals']['away'];
//append all the element to the parent
    matchtile.appendChild(homeTeam);
    matchtile.appendChild(score);
    matchtile.appendChild(awayTeam);
    matchTable.appendChild(matchtile);
}
//fetching cho data
fetch("https://api-football-v1.p.rapidapi.com/v3/timezone", {
    "method": "GET",
    "headers": 
    {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": "d123ef2792msh06b7f701de3647bp183c03jsn551747b5fe1c"
    }
})
.then(response => response.json().then(data => {
    var matchesList = data['response'];
    var fixture = matchesList[0]['fixture'];
    var goals = matchesList[0]['goals'];
    var teams = matchesList[0]['teams'];
    console.log(matchesList.length);
//Now let's set our first match
elapsedTime.innerHTML = fixture['status']['elapsed'] + "'";
homeTeamImage.src = teams['home']['logo'];
homeTeamName.innerHTML = teams['home']['name'];
awayTeamImage.src = teams['away']['logo'];
awayTeamName.innerHTML = teams['away']['name'];
lastMatchGoal.innerHTML = goals['home']+ " - " + goals['away'];
for(var i = 1; i<matchesList.length;i++){
    addMatchTile(matchesList[i]);
}
}))
.catch(err => {
console.log(err);
});