import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.dragNDrop();
    this.selectActiveStep();
  }

  render() {
    this.elem = createElement(`
      <div class="slider">
        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb" style="left: 0%;">
          <span class="slider__value">0</span>
        </div>

        <!--Заполненная часть слайдера-->
        <div class="slider__progress" style="width: 0%;"></div>

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

  selectActiveStep() {
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
        let activStepPercent = `${step * event.target.dataset.index}%`;

        thumb.style.left = activStepPercent;
        progress.style.width = activStepPercent;

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

      this.addCustomEvent(activStep);
    });
  } 

  dragNDrop() {
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let step = 100 / (this.steps - 1);
      
    thumb.addEventListener('pointerdown', (event) => {
      this.elem.classList.add('slider_dragging');
      
      let moveThumb = (event) => {
        let leftRelative = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
        
        if (leftRelative < 0) {
          leftRelative = 0;
        }
        if (leftRelative > 1) {
          leftRelative = 1;
        }
        thumb.style.left = `${Math.round(leftRelative * 100)}%`;
        progress.style.width = `${Math.round(leftRelative * 100)}%`;
        thumb.querySelector('.slider__value').innerHTML = Math.round(leftRelative * 100 / step);
      };

      let upThumb = (event) => {
        let leftRelative = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
        let currentStep = Math.round(leftRelative * 100/step);
        let activStep = this.elem.querySelector('.slider__steps').querySelector('.slider__step-active');
        
        activStep.classList.remove('slider__step-active');
        this.elem.querySelector('.slider__steps').querySelectorAll('span').forEach((elem) => {
          if (elem.dataset.index == currentStep) {
            elem.classList.add('slider__step-active');
            activStep = elem.dataset.index;
          }
        });
        
        thumb.style.left = `${activStep*step}%`;
        progress.style.width = `${activStep*step}%`;
        
        document.removeEventListener('pointermove', moveThumb);
        document.removeEventListener('pointerup', upThumb);
        this.elem.classList.remove('.slider_dragging');

        this.addCustomEvent(activStep);
      };

      document.addEventListener('pointermove', moveThumb);
      document.addEventListener('pointerup', upThumb);
    });

    thumb.ondragstart = () => false;
  } 
  
  addCustomEvent(activStep) {
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: +activStep,
      bubbles: true
    })); 
  }

}
