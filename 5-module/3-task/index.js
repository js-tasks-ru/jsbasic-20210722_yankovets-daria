function initCarousel() {
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let carousel = document.querySelector(".carousel");
  let containerSlides = document.querySelector('.carousel__inner');
  let slides = document.querySelectorAll('.carousel__slide');


  let positionSlide = 0;
  let numberSlide = 1;
  let slideWidth = slides[0].offsetWidth;
  arrowLeft.style.display = 'none';
  
  carousel.addEventListener('click', function(event) {

    if (event.target.closest('.carousel__arrow_right')) {
      positionSlide += slideWidth;
      numberSlide++;
      containerSlides.style.transform = `translateX(-${positionSlide}px)`;
      arrowLeft.style.display = '';
       
    } else if (event.target.closest('.carousel__arrow_left')) {
      positionSlide -= slideWidth;
      numberSlide--;
      containerSlides.style.transform = `translateX(-${positionSlide}px)`;  
      arrowRight.style.display = '';
    } 

    if (numberSlide == slides.length) {
      arrowRight.style.display = 'none';
    } else if (numberSlide == 1) {
      arrowLeft.style.display = 'none';
    }

  });




}