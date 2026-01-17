const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

let index = 0;

function update() {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
}

function goNext() {
    index = (index + 1) % slideItems.length;
    update();
}

let auto = setInterval(goNext, 4000);

// manual via dots
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        index = i;
        update();
        clearInterval(auto);
        auto = setInterval(goNext, 4000);
    });
});

// optional: manual via swipe (tiny version)
let startX = 0;
slides.addEventListener('touchstart', e => startX = e.touches[0].clientX);
slides.addEventListener('touchend', e => {
    let diff = e.changedTouches[0].clientX - startX;
    if (diff < -50 && index < slideItems.length - 1) index++;
    if (diff >  50 && index > 0) index--;
    update();
});
