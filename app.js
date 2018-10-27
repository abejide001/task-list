//define the ui vars
  const form = document.querySelector('#task-form'),
        taskList = document.querySelector('.collection'),
        clearBtn = document.querySelector('.clear-tasks'),
        filter = document.querySelector('#filter'),
        taskInput = document.querySelector('#task');

//load all event listener 
loadEvent();

  function loadEvent() {
  //add an event listener to the form
  form.addEventListener('submit', addTask);
  //remove task  from the list
  taskList.addEventListener('click', remove);
  //clear task
  clearBtn.addEventListener('click', clearTask);
  //filter task eventlistener
  filter.addEventListener('keyup', filterTask);
  
  //load  DOM
  document.addEventListener('DOMContentLoaded', loadTask);
}
function loadTask() {
  let tasks;
  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(element) {
    //create the dom element
    //create a list item
  const list = document.createElement('li');

  //add a class
  list.className = 'collection-item';
  list.appendChild(document.createTextNode(element));
    
  //craet new link element
  const link = document.createElement('a');

  //add a class name
  link.className = 'delete-item secondary-content';

  //set the innerhtml to the element
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // append the llink  to the  list
  list.appendChild(link);

  //append the list to the ul
  document.querySelector('ul').appendChild(list)

  })
}

  function addTask(e) {
    
  //create a list item
  const list = document.createElement('li')

  //add a class
  list.className = 'collection-item';
  list.appendChild(document.createTextNode(taskInput.value))
  
  //craet new link element
  const link = document.createElement('a')

  //add a class name
  link.className = 'delete-item secondary-content';

  //set the innerhtml to the element
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // append the llink  to the  list
  list.appendChild(link);

  //append the list to the ul
  document.querySelector('ul').appendChild(list);

  //store to local storage
  storeLocal(taskInput.value);
  //clear the list
  taskInput.value = '';
  //prevent the form from submitting
  e.preventDefault();

}
  function storeLocal(task) {
  let tasks;
  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task
  function remove(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {

      e.target.parentElement.parentElement.remove()
    //remove  from ls
    removeLocal( e.target.parentElement.parentElement)
  }
}
  function removeLocal(taskItem) {
    let tasks;
  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(element, index) {
    if (taskItem.textContent == element) {
        tasks.splice(index,1 )
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
  }
  function clearTask() {
  taskList.innerHTML = ''
  //remove from local storage
  clearTaskFromStorage()
}
  function clearTaskFromStorage() {
    localStorage.clear()
  }
  function filterTask(e) {
  //convert input to lowercse
  let a = e.target.value.toLowerCase()
  let b = document.querySelectorAll('.collection-item')
//loop through
  b.forEach(function(element) {
  let item = element.firstChild.textContent
  if (item.toLowerCase().indexOf(a) != -1) {
      element.style.display = 'block'
  }
  else {
      element.style.display = 'none';
  }
})
}
