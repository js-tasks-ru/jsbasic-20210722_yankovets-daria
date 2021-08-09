function makeFriendsList(friends) {

  let ul = document.createElement('ul');
  document.body.prepend(ul);
  
  for(let i=0; i<friends.length; i++) { 
    let li = document.createElement('li');
    
    li.innerHTML = friends[i].firstName + ' ' + friends[i].lastName;
    ul.append(li);

  }
  
return ul;
}

makeFriendsList(friends);