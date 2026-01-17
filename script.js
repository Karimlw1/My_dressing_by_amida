let slides = document.querySelectorAll('.slides');
let dots = document.querySelectorAll('.dot');

let index = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;

/* SHOW SLIDE */
function showSlide(i) {
slides.forEach(slide => slide.classList.remove('active'));
dots.forEach(dot => dot.classList.remove('active'));

slides[i].classList.add('active');
dots[i].classList.add('active');
}

/* START DRAG */
function startDrag(x) {
startX = x;
isDragging = true;
}

/* MOVE DRAG */
function moveDrag(x) {
if (!isDragging) return;
currentX = x - startX;
}

/* END DRAG */
function endDrag() {
if (!isDragging) return;
isDragging = false;

if (currentX < -50 && index < slides.length - 1) {
index++;
} else if (currentX > 50 && index > 0) {
index--;
}

currentX = 0;
showSlide(index);
}

/* TOUCH EVENTS */
slides.forEach(slide => {
slide.addEventListener('touchstart', e => startDrag(e.touches[0].clientX));
slide.addEventListener('touchmove', e => moveDrag(e.touches[0].clientX));
slide.addEventListener('touchend', endDrag);

/* MOUSE EVENTS */
slide.addEventListener('mousedown', e => startDrag(e.clientX));
});

window.addEventListener('mousemove', e => moveDrag(e.clientX));
window.addEventListener('mouseup', endDrag);

/* AUTO SLIDE */
