window.onload = () => {
    buttonInformation.forEach(btn => {
        if (btn.id === 'activeFirst') {
            if (window.innerWidth > 768) {
                btn.classList.add(`md:bg-${colorPlanet}/50`); 
            } else if (window.innerWidth < 768) {
                btn.classList.add(`text-${colorPlanet}`); 
            }
        }
    });
};

window.addEventListener('resize', () => {
    document.getElementById("image-geo").classList.add('hidden');
    
    buttonInformation.forEach(btn => {
        if (btn.id === 'activeFirst') {
            if (window.innerWidth > 768) {
                btn.classList.add(`md:bg-${colorPlanet}/50`); 
                btn.classList.remove(`text-${colorPlanet}`); 
            } else {
                btn.classList.remove(`md:bg-${colorPlanet}/50`); 
                btn.classList.add(`text-${colorPlanet}`); 
            }
        } else {
            btn.classList.remove(`md:bg-${colorPlanet}/50`);
            btn.classList.remove(`text-${colorPlanet}`);  
        }
    });
});