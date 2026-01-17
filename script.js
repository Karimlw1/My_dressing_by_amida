
let slides = document.querySelectorAll('.slide');

let dots = document.querySelectorAll('.dot');

let index = 0;



function showSlide(i) {

    slides.forEach(slide => slide.classList.remove('active'));

    dots.forEach(dot => dot.classList.remove('active'));



    slides[i].classList.add('active');

    dots[i].classList.add('active');

}



setInterval(() => {

    index++;

    if (index >= slides.length) index = 0;

    showSlide(index);

}, 4000);

