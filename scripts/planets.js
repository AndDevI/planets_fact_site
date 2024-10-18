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
                            document.getElementById("image-geo").classList.add('hidden');
                            document.getElementById("name").textContent = planet.name;
                            document.getElementById("image").src = planet.images.planet;
                            document.getElementById("content").textContent = planet.overview.content;
                            const sourceLink = document.getElementById("source");
                            sourceLink.href = planet.overview.source;

                            const rotationValue = parseFloat(planet.rotation); 
                            const revolutionValue = parseFloat(planet.revolution); 
                            const radiusValue = parseFloat(planet.radius.replace(/,/g, '')); 
                            const temperatureValue = parseFloat(planet.temperature.replace('°C', '')); 

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
    const minTimer = 50; // intervalo mínimo de atualização
    let startTime = null;

    function step(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const currentValue = Math.floor(progress * range + start);

        // Atualiza o valor do elemento com o valor atual
        element.textContent = `${currentValue} ${unit}`;

        if (progress < 1) {
            requestAnimationFrame(step); // Continua animando até completar
        } else {
            element.textContent = `${end} ${unit}`; // Garante que o valor final seja correto
        }
    }

    requestAnimationFrame(step);
}
