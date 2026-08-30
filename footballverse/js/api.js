async function getMatches() {

    try {

        const response = await fetch(
            "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard"
        );

        const data = await response.json();

        console.log(data);

        // Get only currently live matches
        const matches = data.events.filter(match => {
            return match.status.type.state === "in";
        });

        const container = document.querySelector(".match-container");

        container.innerHTML = "";

        // If there are no live matches
        if (matches.length === 0) {
            container.innerHTML = "<p>No live matches right now.</p>";
            return;
        }

        matches.forEach(match => {

            const competition = match.competitions[0];

            const homeTeam = competition.competitors.find(
                team => team.homeAway === "home"
            );

            const awayTeam = competition.competitors.find(
                team => team.homeAway === "away"
            );

            const homeName = homeTeam.team.displayName;
            const awayName = awayTeam.team.displayName;

            const homeLogo = homeTeam.team.logo;
            const awayLogo = awayTeam.team.logo;

            // Since these are filtered live matches
            const statusText = "● LIVE";
            const statusClass = "status-live";

            const score = `${homeTeam.score} - ${awayTeam.score}`;

            container.innerHTML += `
                <div class="match-card">

                    <div class="teams">

                        <div class="team">
                            <img src="${homeLogo}" alt="${homeName}">
                            <h3>${homeName}</h3>
                        </div>

                        <div class="score">
                            ${score}
                        </div>

                        <div class="team">
                            <img src="${awayLogo}" alt="${awayName}">
                            <h3>${awayName}</h3>
                        </div>

                    </div>

                    <p class="match-status ${statusClass}">
                        ${statusText}
                    </p>

                </div>
            `;
        });

    } catch (error) {

        console.error("Error:", error);

    }
}

getMatches();