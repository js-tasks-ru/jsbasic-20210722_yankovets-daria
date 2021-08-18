import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
    this.addProductInBasket();
    this.showNextSlide();
  }

  render() {
    this.elem = createElement(`
    <div class="carousel">
    <!--Кнопки переключения-->
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
      </div>
    </div>
    `);

     this.slides.forEach((elem) => {   
      this.elem.querySelector('.carousel__inner').insertAdjacentHTML('beforeend', `
        <div class="carousel__slide" data-id=${elem.id}>
          <img src="/assets/images/carousel/${elem.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${elem.price.toFixed(2)}</span>
            <div class="carousel__title">${elem.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);
    });  
  }

  addProductInBasket = () => {
    this.elem.addEventListener('click', (event) => {
      if (event.target.closest('.carousel__button')) {
        let customEvent = new CustomEvent('product-add', { 
          detail: event.target.closest('.carousel__slide').dataset.id, 
          bubbles: true 
        });
        this.elem.dispatchEvent(customEvent);
      } else {
        return;
      }
    });
  }

  showNextSlide() {
    let arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    let arrowRight = this.elem.querySelector('.carousel__arrow_right');
    let containerSlides = this.elem.querySelector('.carousel__inner');
    let slides = this.elem.querySelectorAll('.carousel__slide');
    let positionSlide = 0;
    let numberSlide = 1;
    arrowLeft.style.display = 'none';

    this.elem.addEventListener('click', function(event) {
      let slideWidth = slides[0].offsetWidth;
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
      } else {
        return;
      }

      if (numberSlide == slides.length) {
        arrowRight.style.display = 'none';
      } else if (numberSlide == 1) {
        arrowLeft.style.display = 'none'; 
      } 
    }); 
  }
  
}
