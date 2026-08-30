const params = new URLSearchParams(window.location.search);

const teamId = params.get("team");

console.log(teamId);

async function getTeamDetails() {

    try {

        const response = await fetch(
            `https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/teams/${teamId}`
        );

        const data = await response.json();

        console.log(data);

        const team = data.team;

        const container = document.querySelector("#team-details");

        container.innerHTML = `
    <img src="${team.logos[0].href}" alt="${team.displayName}">

    <h2>${team.displayName}</h2>

    <p>Abbreviation: ${team.abbreviation}</p>

    <p>Nickname: ${team.nickname}</p>

    <p>Location: ${team.location}</p>

    <p>${team.standingSummary}</p>
`;

        console.log(team);

    } catch (error) {

        console.error("Error:", error);

    }
}

getTeamDetails();