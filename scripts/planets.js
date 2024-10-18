let selectedPlanet = "Mercury";  
let colorPlanet = "MercuryColor";  

function updateSelectedPlanet() {
    const planets = document.querySelectorAll('.select');

    const initialPlanetButton = Array.from(planets).find(p => p.value === selectedPlanet);
    if (initialPlanetButton) {
        initialPlanetButton.classList.remove('text-white');
        initialPlanetButton.classList.add(`text-${colorPlanet}`); 
    }

    planets.forEach(planet => {
        planet.addEventListener('click', (event) => {
            const clickedPlanet = event.currentTarget.value;

            if (clickedPlanet === selectedPlanet) {
                return; 
            }

            colorPlanet = `${clickedPlanet}Color`;
            selectedPlanet = clickedPlanet;

            planets.forEach(p => {
                p.classList.remove(`text-${p.value}Color`); 
                p.classList.add('text-white'); 
            });

            planet.classList.remove('text-white');
            planet.classList.add(`text-${colorPlanet}`);

            const mainElement = document.querySelector('main');
            mainElement.classList.add('animate-in'); 

            setTimeout(() => {
                buttonInformation.forEach(btn => {
                    btn.className = ''; 
                    btn.classList.add('button-information', 'md:hover:bg-white/30');

                        if (btn.id === 'activeFirst') {
                            if (window.innerWidth > 768) {
                                btn.classList.add(`md:bg-${colorPlanet}/50`); 
                            } else if (window.innerWidth < 768) {
                                btn.classList.add(`text-${colorPlanet}`); 
                            }
                        }
                });

                fetch('/assets/data/data.json')
                    .then(response => response.json())
                    .then(planetsData => {
                        const planetData = planetsData.find(p => p.name === selectedPlanet);

                        if (planetData) {
                            document.getElementById("image-geo").classList.add('hidden');
                            document.getElementById("name").textContent = planetData.name;
                            document.getElementById("image").src = planetData.images.planet;
                            document.getElementById("content").textContent = planetData.overview.content;
                            const sourceLink = document.getElementById("source");
                            sourceLink.href = planetData.overview.source;

                            const rotationValue = parseFloat(planetData.rotation); 
                            const revolutionValue = parseFloat(planetData.revolution); 
                            const radiusValue = parseFloat(planetData.radius.replace(/,/g, '')); 
                            const temperatureValue = parseFloat(planetData.temperature.replace('°C', '')); 

                            animateValue("rotation", parseFloat(document.getElementById("rotation").textContent), rotationValue, 1000, "Hours");
                            animateValue("revolution", parseFloat(document.getElementById("revolution").textContent), revolutionValue, 1000, "Years");
                            animateValue("radius", parseFloat(document.getElementById("radius").textContent.replace(/,/g, '')), radiusValue, 1000, "KM");
                            animateValue("temperature", parseFloat(document.getElementById("temperature").textContent.replace('°C', '')), temperatureValue, 1000, "°C");
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




function animateValue(id, start, end, duration, unit) {
    const element = document.getElementById(id);
    const range = end - start;
    const minTimer = 50; 
    let startTime = null;

    function step(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const currentValue = Math.floor(progress * range + start);

        element.textContent = `${currentValue} ${unit}`;

        if (progress < 1) {
            requestAnimationFrame(step); 
        } else {
            element.textContent = `${end} ${unit}`; 
        }
    }

    requestAnimationFrame(step);
}
