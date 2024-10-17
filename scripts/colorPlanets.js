let selectedPlanet = "Mercury";  
let colorPlanet = "MercuryColor";  

function updateSelectedPlanet() {
    const planets = document.querySelectorAll('.select');

    planets.forEach(planet => {
        planet.addEventListener('click', (event) => {
            colorPlanet = `${event.currentTarget.value}Color`;
            selectedPlanet = event.currentTarget.value;

            buttonInformation.forEach(btn => {
                btn.className = ''; 
                btn.classList.add('button-information', 'md:hover:bg-white/30');

                if (btn.id === 'activeFirst') {
                    btn.classList.add(`bg-${colorPlanet}/50`); 
                }
            });
        });
    });
}
updateSelectedPlanet();


const buttonInformation = document.querySelectorAll('.button-information');
window.onload = () => {
    buttonInformation.forEach(btn => {
        if (btn.id === 'activeFirst') btn.classList.add(`bg-${colorPlanet}/50`);
    });
};

buttonInformation.forEach(button => {
    button.addEventListener('click', () => {
        const dynamicClass = `bg-${colorPlanet}/50`;

        buttonInformation.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.remove(dynamicClass); 
        });

        button.classList.add('active', dynamicClass);
    });
});





