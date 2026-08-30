async function getPlayers() {

    try {

        // Get all Premier League teams
        const response = await fetch(
            "https://site.api.espn.com/apis/v2/sports/soccer/eng.1/standings"
        );

        const data = await response.json();


        // Get standings
        const standings = data.children[0].standings;


        // Get all teams
        const entries = standings.entries;


        // Store all players
        const allPlayers = [];


        // Fetch each team's roster
        for (const entry of entries) {

            const teamId = entry.team.id;
            const teamName = entry.team.displayName;

            const rosterResponse = await fetch(
                `https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/teams/${teamId}/roster`
            );

            const rosterData = await rosterResponse.json();


            // Add team name to every player
            rosterData.athletes.forEach(player => {

                player.teamName = teamName;

                allPlayers.push(player);

            });

        }


        console.log(allPlayers);


        // Get HTML elements
        const container = document.querySelector("#players-container");
        const searchInput = document.querySelector("#player-search");
        const teamFilter = document.querySelector("#team-filter");


        // Create team filter options
        const teams = [...new Set(
            allPlayers.map(player => player.teamName)
        )];

        teams.forEach(team => {

            teamFilter.innerHTML += `
                <option value="${team}">
                    ${team}
                </option>
            `;

        });


        // Function to display players
        function displayPlayers() {

            const searchText = searchInput.value.toLowerCase();

            const selectedTeam = teamFilter.value;


            // Filter players
            const filteredPlayers = allPlayers.filter(player => {

                const matchesName = player.displayName
                    .toLowerCase()
                    .includes(searchText);

                const matchesTeam =
                    selectedTeam === "all" ||
                    player.teamName === selectedTeam;

                return matchesName && matchesTeam;

            });


            // Clear container
            container.innerHTML = "";


            // No players found
            if (filteredPlayers.length === 0) {

                container.innerHTML = `
                    <p class="no-players">
                        No players found.
                    </p>
                `;

                return;
            }


            // Display players
            filteredPlayers.forEach(player => {

                container.innerHTML += `
                    <div class="player-card">

                        <h3>${player.displayName}</h3>

                        <p>${player.teamName}</p>

                        <p>
                            Age: ${player.age}
                        </p>

                        <p>
                            Height: ${player.displayHeight}
                        </p>

                        <p>
                            Weight: ${player.displayWeight}
                        </p>

                    </div>
                `;

            });

        }


        // Display all players initially
        displayPlayers();


        // Search players
        searchInput.addEventListener(
            "input",
            displayPlayers
        );


        // Filter by team
        teamFilter.addEventListener(
            "change",
            displayPlayers
        );


    } catch (error) {

        console.error("Error:", error);

    }

}

getPlayers();