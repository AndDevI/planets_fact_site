let selectedPlanet = "Mercury";  
let colorPlanet = "MercuryColor";  

function updateSelectedPlanet() {
    const planets = document.querySelectorAll('.select');

    planets.forEach(planet => {
        planet.addEventListener('click', (event) => {
            const clickedPlanet = event.currentTarget.value;

            if (clickedPlanet === selectedPlanet) {
                return;
            }

            colorPlanet = `${clickedPlanet}Color`;
            selectedPlanet = clickedPlanet;

            const mainElement = document.querySelector('main');
            mainElement.classList.add('animate-in'); 

            setTimeout(() => {
                buttonInformation.forEach(btn => {
                    btn.className = ''; 
                    btn.classList.add('button-information', 'md:hover:bg-white/30');

                    if (btn.id === 'activeFirst') {
                        btn.classList.add(`bg-${colorPlanet}/50`); 
                    }
                });

                
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
                    });

               
                mainElement.classList.remove('animate-in'); 
                mainElement.classList.add('animate-in-active'); 

                setTimeout(() => {
                    mainElement.classList.remove('animate-in-active');
                }, 500); 
            }, 500); 
        });
    });
}
updateSelectedPlanet();