function highlight(table) {
    
    let cellStatus;
    let cellGender;
    let cellAge;
    let thead = table.querySelector('thead'); 
    let tbody = table.querySelector('tbody');

    for (let c = 0; c < thead.rows[0].cells.length; c++) {
      switch (thead.rows[0].cells[c].innerHTML) {
        case 'Status':
          cellStatus = c;
          break;
        case 'Gender':
          cellGender = c;
          break;
        case 'Age':
          cellAge = c;
          break;
        default: break;
      }
    }
  
    for (let r = 0; r < tbody.rows.length; r++) {
      let tr = tbody.rows[r];
      let tdStatus = tbody.rows[r].cells[cellStatus];
      let tdGender = tbody.rows[r].cells[cellGender];
      let tdAge = tbody.rows[r].cells[cellAge];

      if (tdStatus.getAttribute('data-available') == 'true') {
        tr.classList.add('available');
      } else if (tdStatus.getAttribute('data-available') == 'false') {
        tr.classList.add('unavailable');
      } else if (tdStatus.getAttribute('data-available') == null) {
        tr.setAttribute('hidden', true);
      }

      if (tdGender.innerHTML === 'm') {
        tr.classList.add('male');
      } else if (tdGender.innerHTML === 'f') {
        tr.classList.add('female');
      }
      
      if (tdAge.innerHTML < 18) {
        tr.style.cssText = `text-decoration: line-through`;
      }
    }   
}