async function getTeams() {

    try {

        const response = await fetch(
            "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard"
        );

        const data = await response.json();

        const container = document.querySelector(".team-container");

        container.innerHTML = "";

        const teams = [];

        data.events.forEach(match => {

            const competition = match.competitions[0];

            competition.competitors.forEach(competitor => {

                const team = competitor.team;

                // Avoid duplicate teams
                if (!teams.some(t => t.id === team.id)) {
                    teams.push(team);
                }

            });

        });

       console.log(teams);

const featuredTeams = teams.slice(0, 6);

featuredTeams.forEach(team => {

    container.innerHTML += `
        <a href="pages/teams.html?team=${team.id}" class="team-card">

            <img src="${team.logo}" alt="${team.displayName}">

            <h3>${team.displayName}</h3>

        </a>
    `;

});

    } catch (error) {

        console.error("Error:", error);

    }
}

getTeams();