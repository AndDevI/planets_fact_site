function createStars () {
    let star = document.createElement('div');
    star.classList.add("bg-white/50", "rounded-full", "absolute");

    let size = Math.random() * 8 + 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    let posX = Math.random() * window.innerWidth;
    let posY = Math.random() * window.innerHeight;

    star.style.left = `${posX}px`;
    star.style.top = `${posY}px`;

    star.style.opacity = 0;
    star.style.transition = 'opacity 1s ease-out';

    document.getElementById('star-container').appendChild(star);

    setTimeout(function () {
      star.style.opacity = 0.5;
    }, 10); 

    setTimeout(function () {
      star.style.opacity = 0;
      setTimeout(function () {
        document.body.removeChild(star);  
      }, 1000); 
    }, 1000); 
}

setInterval(function() {
    createStars();
}, 80);
