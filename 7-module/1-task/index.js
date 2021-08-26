import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.scrollRibbon();
    this.selectItemActive();
  }
    
   render() {
    this.elem = createElement(`
        <div class="ribbon">
          <!--Кнопка прокрутки влево-->
          <button class="ribbon__arrow ribbon__arrow_left">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </button>

          <!--Ссылки на категории-->
          <nav class="ribbon__inner">
          </nav>

          <!--Кнопка прокрутки вправо-->
          <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        </div>
    `);

    this.categories.forEach((elem) => {   
      this.elem.querySelector('.ribbon__inner').insertAdjacentHTML('beforeend', `
        <a href="#" class="ribbon__item" data-id=${elem.id}>${elem.name}</a>
      `);
    }); 
    this.elem.querySelector('.ribbon__item').classList.add('ribbon__item_active');
  }

  scrollRibbon() {
    
    let ribbonInner = this.elem.querySelector('.ribbon__inner'); 

    this.elem.addEventListener('click', function(event) {
      if (event.target.closest('.ribbon__arrow_right')) {
        ribbonInner.scrollBy(350, 0);        
      } else if (event.target.closest('.ribbon__arrow_left')) {
        ribbonInner.scrollBy(-350, 0);
      } else {
        return;
      }
    });

    ribbonInner.addEventListener('scroll', () => {
      let scrollRight = ribbonInner.scrollWidth - ribbonInner.clientWidth - ribbonInner.scrollLeft;

      if (ribbonInner.scrollLeft == 0) {
        this.elem.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');

      } else if (scrollRight < 1) {
        this.elem.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');

      } else {
        this.elem.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
        this.elem.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
      }      
    }); 
  }

  selectItemActive() {
    this.elem.querySelector('.ribbon__inner').addEventListener('click', (event) => {
      event.preventDefault();

      let activItem = event.currentTarget.querySelector('.ribbon__item_active');
      activItem.classList.remove('ribbon__item_active');
      let selectCategory= event.target;
      selectCategory.classList.add('ribbon__item_active');

      let ribbonSelect = new CustomEvent('ribbon-select', { 
        detail: selectCategory.dataset.id, 
        bubbles: true 
      }); 
      this.elem.dispatchEvent(ribbonSelect);
    });
  }
}
