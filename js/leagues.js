const leagues = [
    {
        id: "eng.1",
        name: "Premier League"
    },
    {
        id: "esp.1",
        name: "La Liga"
    },
    {
        id: "ger.1",
        name: "Bundesliga"
    },
    {
        id: "ita.1",
        name: "Serie A"
    },
    {
        id: "fra.1",
        name: "Ligue 1"
    }
];


const container = document.querySelector("#leagues-container");

leagues.forEach(league => {

    container.innerHTML += `
        <a href="standings.html?league=${league.id}" class="league-card">

            <h2>${league.name}</h2>

        </a>
    `;

});