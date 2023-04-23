let currentSlide = 0;
const slides = document.querySelectorAll('.slide');


setInterval(() => {

  currentSlide = (currentSlide + 1) % slides.length;
//   slides.forEach(slide => slide.classList.remove('active'));
//   slides[currentSlide].classList.add('active');
    displaySlide(currentSlide);
}, 4000);

const displaySlide = (currentSlide) => {
     console.log(currentSlide);
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');
}

const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    displaySlide(currentSlide);
}
const prevSlide = () => {
    if (currentSlide == 0) currentSlide = slides.length - 1;
    else currentSlide = (currentSlide - 1) % slides.length;
    displaySlide(currentSlide);
}

$('.left-btn').click(prevSlide);
$('.right-btn').click(nextSlide);

$('.slide').click(function (e) {
    // e.preventDefault();
    // console.log(e.target)

    let id = e.currentTarget.id;
    if(e.target.classList[0]!='left-btn'&&e.target.classList[0]!='right-btn')
     window.location.href = '/posts/' + id;
});