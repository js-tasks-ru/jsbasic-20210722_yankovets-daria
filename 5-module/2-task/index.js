function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let text = document.querySelector('#text');
  button.onclick = function() {
    if(text.hidden){
      text.hidden = false;
    } else {
      text.hidden = true;
    }
  };
}