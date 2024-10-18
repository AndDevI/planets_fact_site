function fetchAndUpdatePlanetInfo() {
    fetch('../assets/data/data.json')
        .then(response => response.json())
        .then(planetsData => {
            const planet = planetsData.find(p => p.name === selectedPlanet);

            if (planet) {
                document.getElementById("name").textContent = planet.name;
                document.getElementById("image").src = planet.images.planet;
                document.getElementById("content").textContent = planet.overview.content;
                const sourceLink = document.getElementById("source");
                sourceLink.href = planet.overview.source;
            }
        })
        .catch(error => console.error('Error fetching planet data:', error));
}