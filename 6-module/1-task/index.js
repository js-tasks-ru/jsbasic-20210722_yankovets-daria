/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.render(rows);
  }

  render(rows) {
    this.elem = document.createElement('table');
    this.elem.innerHTML = `
        <thead>
            <tr>
                <th>Имя</th>
                <th>Возраст</th>
                <th>Зарплата</th>
                <th>Город</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    let tbody = this.elem.querySelector('tbody');

    rows.forEach((elem) => {
      let tr = document.createElement('tr');
         
      for(let key in elem) {
        tbody.append(tr);
        let td = document.createElement('td');
        tr.append(td);
        td.innerHTML = elem[key];
      }       
    });

    for(let elem of tbody.querySelectorAll('tr')) {
      elem.lastElementChild.insertAdjacentHTML('afterend', `<td><button>X</button></td>`);
    }
    document.body.append(this.elem);

    this.elem.addEventListener('click', (event) => {
      if(event.target.tagName != 'BUTTON') {
        return;
      }
      event.target.closest('tr').remove();
    });

  }




}

