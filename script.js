const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

let index = 0;

// update slide position
function update() {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
}

// auto
let auto = setInterval(() => {
    index = (index + 1) % slideItems.length;
    update();
}, 3500);

// dots
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        index = i;
        update();
        restartAuto();
    });
});

// touch
let startX = 0;

slides.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

slides.addEventListener('touchend', e => {
    let diff = e.changedTouches[0].clientX - startX;

    if (diff < -50 && index < slideItems.length - 1) index++;
    if (diff > 50 && index > 0) index--;

    update();
    restartAuto();
});

function restartAuto() {
    clearInterval(auto);
    auto = setInterval(() => {
        index = (index + 1) % slideItems.length;
        update();
    }, 3500);
}

/* reveal */

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry =>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
    }
    else{
      entry.target.classList.remove("visible");
    }
  });
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function showMenu(){
    const menuContent = document.querySelector(".socials");
    menuContent.classList.toggle("visible");
}

/* copyright */

document.getElementById('year').textContent = new Date().getFullYear();