const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

let index = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;
let slideWidth = slideItems[0].offsetWidth;

/* UPDATE POSITION */
function updateSlide() {
slides.style.transition = 'transform 0.35s ease';
slides.style.transform = `translateX(${-index * slideWidth}px)`;

dots.forEach(dot => dot.classList.remove('active'));
dots[index].classList.add('active');
}

/* START */
function startDrag(x) {
startX = x;
isDragging = true;
slides.style.transition = 'none';
}

/* MOVE */
function moveDrag(x) {
if (!isDragging) return;
currentX = x - startX;
slides.style.transform =
`translateX(${currentX - index * slideWidth}px)`;
}

/* END */
function endDrag() {
if (!isDragging) return;
isDragging = false;

if (currentX < -50 && index < slideItems.length - 1) index++;
if (currentX > 50 && index > 0) index--;

currentX = 0;
updateSlide();
}

/* TOUCH EVENTS */
slides.addEventListener('touchstart', e =>
startDrag(e.touches[0].clientX)
);
slides.addEventListener('touchmove', e =>
moveDrag(e.touches[0].clientX)
);
slides.addEventListener('touchend', endDrag);

/* MOUSE EVENTS */
slides.addEventListener('mousedown', e =>
startDrag(e.clientX)
);
window.addEventListener('mousemove', e =>
moveDrag(e.clientX)
);
window.addEventListener('mouseup', endDrag);

/* AUTO PLAY */
setInterval(() => {
index = (index + 1) % slideItems.length;
updateSlide();
}, 4000);

/* RESIZE FIX */
window.addEventListener('resize', () => {
slideWidth = slideItems[0].offsetWidth;
updateSlide();
});