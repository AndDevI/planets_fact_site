const buttonInformation = document.querySelectorAll('.button-information');
let buttonValueInfo = null; 

window.onload = () => {
    buttonInformation.forEach(btn => {
        if (btn.id === 'activeFirst') {
            btn.classList.add(`bg-${colorPlanet}/50`); 
        }
    });
};

buttonInformation.forEach(button => {
    button.addEventListener('click', () => {
        const dynamicClass = `bg-${colorPlanet}/50`;

        buttonInformation.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.remove(dynamicClass); 
        });

        button.classList.add('active');
        button.classList.add(dynamicClass);

        buttonValueInfo = button.value; 

        fetch('../assets/data/data.json')
            .then(response => response.json())
            .then(planetsData => {
                const planet = planetsData.find(p => p.name === selectedPlanet);

                if (planet && buttonValueInfo === "overview") {
                    document.getElementById("image-geo").classList.add('hidden');
                    document.getElementById("name").textContent = planet.name;
                    document.getElementById("image").src = planet.images.planet;
                    document.getElementById("content").textContent = planet.overview.content;
                    const sourceLink = document.getElementById("source");
                    sourceLink.href = planet.overview.source;
                } else if (planet && buttonValueInfo === "structure") {
                    document.getElementById("image-geo").classList.add('hidden');
                    document.getElementById("name").textContent = planet.name;
                    document.getElementById("image").src = planet.images.internal;
                    document.getElementById("content").textContent = planet.structure.content;
                    const sourceLink = document.getElementById("source");
                    sourceLink.href = planet.structure.source;
                } else if (planet && buttonValueInfo === "surface") {
                    document.getElementById("name").textContent = planet.name;
                    document.getElementById("image").src = planet.images.planet;
                    document.getElementById("image-geo").src = planet.images.geology;
                    document.getElementById("image-geo").classList.remove('hidden');
                    document.getElementById("content").textContent = planet.geology.content;
                    const sourceLink = document.getElementById("source");
                    sourceLink.href = planet.geology.source;
                } 
            })
            
    });
});
