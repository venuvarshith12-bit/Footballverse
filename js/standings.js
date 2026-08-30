const params = new URLSearchParams(window.location.search);

const leagueid = params.get("league") || "eng.1";

console.log(leagueid);
async function getStandings() {

    try {

        const response = await fetch(
            `https://site.api.espn.com/apis/v2/sports/soccer/${leagueid}/standings`
        );

        const data = await response.json();

        console.log(data);


        // Get the Premier League
        const league = data;

        // Get the current season
        const season = league.children[0];

        // Get the standings
        const standings = season.standings;

        console.log(standings);


        // Get the container
        const container = document.querySelector("#standings-container");

        container.innerHTML = "";


        // Create a row for every team
        standings.entries.forEach((entry, index) => {

            const team = entry.team;


            // Find required statistics
            const played = entry.stats.find(
                stat => stat.name === "gamesPlayed"
            );

            const wins = entry.stats.find(
                stat => stat.name === "wins"
            );

            const draws = entry.stats.find(
                stat => stat.name === "ties"
            );

            const losses = entry.stats.find(
                stat => stat.name === "losses"
            );

            const goalDifference = entry.stats.find(
                stat => stat.name === "pointDifferential"
            );

            const points = entry.stats.find(
                stat => stat.name === "points"
            );


            // Add row to the table
        let positionClass = "";

if (entry.note) {

    if (entry.note.description === "Champions League") {
        positionClass = "champions-league";
    }

    else if (entry.note.description === "Europa League") {
        positionClass = "europa-league";
    }

    else if (entry.note.description === "Relegation") {
        positionClass = "relegation";
    }

}

container.innerHTML += `

    <div class="standing-row ${positionClass}">

        <div>${index + 1}</div>

        <div class="team-name">

            <img 
                src="${team.logos[0].href}" 
                alt="${team.displayName}"
            >

            <span>${team.displayName}</span>

        </div>

        <div>${played.value}</div>
        <div>${wins.value}</div>
        <div>${draws.value}</div>
        <div>${losses.value}</div>
        <div>${goalDifference.value}</div>
        <div>${points.value}</div>

    </div>
`;
        });

    } catch (error) {

        console.error("Error:", error);

    }

}

getStandings();