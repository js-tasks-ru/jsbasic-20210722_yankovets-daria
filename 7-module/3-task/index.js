import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.selectActivStep();
  }

  render() {
    this.elem = createElement(`
      <div class="slider">
        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb" style="left: 50%;">
          <span class="slider__value">2</span>
        </div>

        <!--Заполненная часть слайдера-->
        <div class="slider__progress" style="width: 50%;"></div>

        <!--Шаги слайдера-->
        <div class="slider__steps">
        </div>
      </div>
    `);
 
    for(let i = 0; i < this.steps; i++) {
      let span = document.createElement('span');
      span.dataset.index = i;
      this.elem.querySelector('.slider__steps').append(span);
    } 
    this.elem.querySelector('.slider__steps').querySelector('span').classList.add('slider__step-active');
  }

  selectActivStep() {
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let slider = this.elem.querySelector('.slider__steps');

    this.elem.addEventListener('click', (event) => {
      let step = 100 / (this.steps - 1);
      let activStep = slider.querySelector('.slider__step-active').dataset.index;
      
      if(event.target.tagName == 'SPAN') {
        thumb.querySelector('.slider__value').innerHTML = event.target.dataset.index;

        slider.querySelector('.slider__step-active').classList.remove('slider__step-active');
        event.target.classList.add('slider__step-active');
        activStep = event.target.dataset.index;

        thumb.style.left = `${step * event.target.dataset.index}%`;
        progress.style.width = `${step * event.target.dataset.index}%`;

      } else  {
        let clientRect = this.elem.getBoundingClientRect();
        let numStep = Math.round(Math.floor((event.clientX - clientRect.x)*100/clientRect.width)/step);
        thumb.querySelector('.slider__value').innerHTML = numStep;
        slider.querySelector('.slider__step-active').classList.remove('slider__step-active');

        slider.querySelectorAll('span').forEach((elem) => {
          if (elem.dataset.index == numStep) {
            elem.classList.add('slider__step-active');
            activStep = elem.dataset.index;
          }
        });
        
        thumb.style.left = `${step * numStep}%`;
        progress.style.width = `${step * numStep}%`;
      }

      const sliderChange = new CustomEvent('slider-change', {
        detail: +activStep,
        bubbles: true
      });
      this.elem.dispatchEvent(sliderChange);
    });
  } 



}
