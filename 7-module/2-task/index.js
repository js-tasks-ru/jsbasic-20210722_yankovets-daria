import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.closeModal();
  }

  render() {
    this.elem = createElement(`
      <!--Корневой элемент Modal-->
      <div class="modal">
        <!--Прозрачная подложка перекрывающая интерфейс-->
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title">
              Вот сюда нужно добавлять заголовок
            </h3>
          </div>

          <div class="modal__body">
            A сюда нужно добавлять содержимое тела модального окна
          </div>
        </div>

      </div>
    `);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  setTitle(text) {
    let modalTitle = this.elem.querySelector('.modal__title');
    modalTitle.textContent = text;
  }

  setBody(node) {
    this.elem.querySelector('.modal__body').textContent = '';
    this.elem.querySelector('.modal__body').append(node);
  }

  closeModal() {

    function keydownEscape(event) {
      if (event.code === 'Escape' && document.body.querySelector('.modal')) {
        document.body.querySelector('.modal').remove();
        document.body.classList.remove('is-modal-open');
        document.removeEventListener('keydown', keydownEscape);
      } 
    }

    document.addEventListener('keydown', keydownEscape);

    this.elem.addEventListener('click', (event) => {
      if (event.target.closest('.modal__close')) {
        document.body.querySelector('.modal').remove();
        document.body.classList.remove('is-modal-open');
        document.removeEventListener('keydown', keydownEscape);
      }
    });
  }

  close() {
    if (document.querySelector('.modal')) {
      document.body.querySelector('.modal').remove();
      document.body.classList.remove('is-modal-open');
    }
  }

}
