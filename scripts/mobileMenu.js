function createPlanetsMenu() {
    fetch('../assets/data/data.json')
        .then(response => response.json())
        .then(datas => {
            const planetsColors = [
                'mercuryColor',
                'venusColor',
                'earthColor',
                'marsColor',
                'jupiterColor',
                'saturnColor',
                'uranusColor',
                'neptuneColor',
            ];

            const ulMobile = document.querySelector('#ul_mobile');

            datas.forEach((data, index) => {
                const line = document.createElement('div');
                line.classList.add('bg-white/10', 'h-px', 'opacity-0', 'transition-opacity', 'duration-500');

                const li = document.createElement('li');
                li.classList.add('opacity-0', 'transition-opacity', 'duration-500');

                const a = document.createElement('a');
                a.href = '#';
                a.classList.add('flex', 'items-center');
                a.setAttribute('aria-label', `${data.name} page`);

                const innerDiv = document.createElement('div');
                innerDiv.classList.add('flex', 'items-center', 'gap-6');

                const circleDiv = document.createElement('div');
                circleDiv.classList.add('w-5', 'h-5', 'rounded-full', `bg-${planetsColors[index % planetsColors.length]}`);

                const mercuryText = document.createElement('p');
                mercuryText.textContent = data.name;
                mercuryText.classList.add('text-white', 'text-lg', 'font-spartan', 'font-bold', 'tracking-wide', 'uppercase');

                innerDiv.appendChild(circleDiv);
                innerDiv.appendChild(mercuryText);

                const chevronIcon = document.createElement('img');
                chevronIcon.src = 'assets/icons/icon-chevron.svg';
                chevronIcon.alt = `Navigate to ${data.name}`;
                chevronIcon.classList.add('ml-auto');

                a.appendChild(innerDiv);
                a.appendChild(chevronIcon);

                li.appendChild(a);

                ulMobile.appendChild(li);
                ulMobile.appendChild(line);

                setTimeout(() => {
                    li.classList.remove('opacity-0'); 
                    li.classList.add('opacity-100'); 

                    line.classList.remove('opacity-0'); 
                    line.classList.add('opacity-100'); 
                }, 100 * index); 
            });
        });
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

        main.classList.add('animate-in-back');
        setTimeout(() => {
            main.classList.remove('animate-in-back-active');
        }, 10); 
    } else {
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

            main.classList.add('animate-in-back-active');
        }, 100 * (lis.length + lines.length)); 
    }
});

