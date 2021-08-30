import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
        <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
      </div>
    </div>
    `);

    this.products.forEach(product => {
      let card = new ProductCard(product);
      this.elem.querySelector('.products-grid__inner').append(card.elem);
    });
  }

  updateFilter = (filters) => {
    Object.assign(this.filters, filters);
    let div = this.elem.querySelector('.products-grid__inner');
    div.textContent = '';
    
    this.products.forEach(product => {
      
       if (this.filters.noNuts && product.nuts) {
        return;
      } else if (this.filters.vegeterianOnly && !product.vegeterian) {
        return;
      } else if (product.spiciness > this.filters.maxSpiciness && this.filters.hasOwnProperty('maxSpiciness')) {
        return;
      } else if (this.filters.category !== product.category && this.filters.hasOwnProperty('category')) {
        return;
      } 

      let card = new ProductCard(product);
      this.elem.querySelector('.products-grid__inner').append(card.elem); 
    });
  }
}
