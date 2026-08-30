async function getMatches() {

    try {

        const response = await fetch(
            "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard"
        );

        const data = await response.json();

        const container = document.querySelector("#matches-container");

        const events = data.events;


        function displayMatches(filter) {

            container.innerHTML = "";

            const filteredMatches = events.filter(match => {

                const state = match.status.type.state;

                if (filter === "all") {
                    return true;
                }

                if (filter === "live") {
                    return state === "in";
                }

                if (filter === "upcoming") {
                    return state === "pre";
                }

                if (filter === "finished") {
                    return state === "post";
                }

            });


            if (filteredMatches.length === 0) {

                container.innerHTML = `
                    <p class="no-matches">
                        No ${filter === "all" ? "" : filter}
                        matches available.
                    </p>
                `;

                return;
            }


            filteredMatches.forEach(match => {

                const competition = match.competitions[0];


                const homeTeam = competition.competitors.find(
                    team => team.homeAway === "home"
                );

                const awayTeam = competition.competitors.find(
                    team => team.homeAway === "away"
                );


                const status = match.status.type;

                const state = status.state;


                // Date and time
                const matchDate = new Date(match.date);

                const formattedDate = matchDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                });

                const formattedTime = matchDate.toLocaleTimeString("en-IN", {
                    hour: "numeric",
                    minute: "2-digit"
                });


                container.innerHTML += `

                    <div class="match-card ${state}">

                        <p class="match-league">
                            Premier League
                        </p>


                        <div class="match-teams">


                            <div class="match-team">

                                <img
                                    src="${homeTeam.team.logo}"
                                    alt="${homeTeam.team.displayName}"
                                >

                                <h3>
                                    ${homeTeam.team.displayName}
                                </h3>

                                <span>
                                    ${homeTeam.score || "-"}
                                </span>

                            </div>


                            <div class="match-info">

                                <p>VS</p>

                                <span class="match-date">
                                    ${formattedDate}
                                </span>

                                <span class="match-time">
                                    ${formattedTime}
                                </span>

                                <span class="match-status">
                                    ${state === "in"
                                        ? "🔴 LIVE"
                                        : status.shortDetail}
                                </span>

                            </div>


                            <div class="match-team">

                                <img
                                    src="${awayTeam.team.logo}"
                                    alt="${awayTeam.team.displayName}"
                                >

                                <h3>
                                    ${awayTeam.team.displayName}
                                </h3>

                                <span>
                                    ${awayTeam.score || "-"}
                                </span>

                            </div>


                        </div>

                    </div>

                `;

            });

        }


        // Show all matches initially
        displayMatches("all");


        // Filter buttons
        const filterButtons =
            document.querySelectorAll(".filter-btn");


        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                const filter = button.dataset.filter;


                filterButtons.forEach(btn => {
                    btn.classList.remove("active");
                });


                button.classList.add("active");


                displayMatches(filter);

            });

        });


    } catch (error) {

        console.error("Error:", error);

    }

}


getMatches();
