function createPlanetsMenu() {
    fetch('../assets/data/data.json')
        .then(response => response.json())
        .then(datas => {
            const planetsColors = [
                'MercuryColor',
                'VenusColor',
                'EarthColor',
                'MarsColor',
                'JupiterColor',
                'SaturnColor',
                'UranusColor',
                'NeptuneColor',
            ];

            const ulMobile = document.querySelector('#ul_mobile');
            ulMobile.innerHTML = ''; 

            datas.forEach((data, index) => {
                const line = document.createElement('div');
                line.classList.add('bg-white/10', 'h-px', 'opacity-0', 'transition-opacity', 'duration-500');

                const li = document.createElement('li');
                li.classList.add('opacity-0', 'transition-opacity', 'duration-500', 'justify-between');

                const buttonPlanets = document.createElement('button');
                buttonPlanets.value = data.name;
                buttonPlanets.classList.add('flex', 'items-center', 'w-full', 'select');
                buttonPlanets.setAttribute('aria-label', `${data.name} page`);

                buttonPlanets.addEventListener('click', () => {
                    closeMenu(); 
                });

                const innerDiv = document.createElement('div');
                innerDiv.classList.add('flex', 'items-center', 'gap-6');

                const circleDiv = document.createElement('div');
                circleDiv.classList.add('w-5', 'h-5', 'rounded-full', `bg-${planetsColors[index % planetsColors.length]}`);

                const planetsText = document.createElement('p');
                planetsText.textContent = data.name;
                planetsText.classList.add('text-white', 'text-lg', 'font-spartan', 'font-bold', 'tracking-wide', 'uppercase');

                innerDiv.appendChild(circleDiv);
                innerDiv.appendChild(planetsText);

                const chevronIcon = document.createElement('img');
                chevronIcon.src = 'assets/icons/icon-chevron.svg';
                chevronIcon.alt = `Navigate to ${data.name}`;
                chevronIcon.classList.add('ml-auto');

                buttonPlanets.appendChild(innerDiv);
                buttonPlanets.appendChild(chevronIcon);

                li.appendChild(buttonPlanets);
                ulMobile.appendChild(li);
                ulMobile.appendChild(line);

                setTimeout(() => {
                    li.classList.remove('opacity-0');
                    li.classList.add('opacity-100');

                    line.classList.remove('opacity-0');
                    line.classList.add('opacity-100');
                }, 100 * index);
            });
            updateSelectedPlanet();
        });
}

function closeMenu() {
    const buttonMenu = document.querySelector('#btn_menu');
    const menu = document.querySelector('#menu_mobile');
    const ulMobile = document.querySelector('#ul_mobile'); 
    const main = document.querySelector('main');

    buttonMenu.classList.remove('active');
    const lis = ulMobile.querySelectorAll('li');
    const lines = ulMobile.querySelectorAll('div.h-px'); 

    lis.forEach((li, index) => {
        setTimeout(() => {
            li.classList.remove('opacity-100'); 
            li.classList.add('opacity-0'); 
        }, 100 * index); 
    });

    lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.remove('opacity-100'); 
            line.classList.add('opacity-0'); 
        }, 100 * index); 
    });

    setTimeout(() => {
        ulMobile.innerHTML = ''; 
        menu.classList.replace('translate-x-0', 'translate-x-full'); 

        main.classList.add('animate-in-active');
    }, 100 * (lis.length + lines.length)); 
}

const buttonMenu = document.querySelector('#btn_menu');

buttonMenu.addEventListener('click', () => {
    const menu = document.querySelector('#menu_mobile');
    const ulMobile = document.querySelector('#ul_mobile'); 
    const main = document.querySelector('main'); 

    if (!buttonMenu.classList.contains('active')) {
        buttonMenu.classList.add('active');
        menu.classList.replace('translate-x-full', 'translate-x-0');
        createPlanetsMenu();

        main.classList.add('animate-in');
        setTimeout(() => {
            main.classList.remove('animate-in-active');
        }, 10); 
    } else {
        closeMenu(); 
    }
});


function animatePlanetButtons() {
    const buttons = document.querySelectorAll('#ul_desktop .button-planets');
    
    buttons.forEach((button, index) => {
        setTimeout(() => {
            button.classList.remove('opacity-0'); 
            button.classList.add('opacity-100');   
        }, index * 300);
    });
    
}

function updateDesktopMenu() {
    const menu = document.getElementById('menu_desktop');
    const buttons = document.querySelectorAll('#ul_desktop .button-planets');

    if (window.innerWidth >= 1024) { 
        menu.classList.remove('hidden'); 
        animatePlanetButtons(); 
        
    } else {
        menu.classList.add('hidden'); 
        buttons.forEach(button => {
            button.classList.remove('opacity-100'); 
            button.classList.add('opacity-0'); 
        });
    }
}
updateDesktopMenu();
window.addEventListener('resize', updateDesktopMenu);

