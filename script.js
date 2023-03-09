//Date
const dateElement = document.getElementById("date");
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

const list = document.getElementById("list");
var input = document.querySelector("#input");
let id = 0,
  count_for_cb = 1000;

//! localStorage.removeItem("TODO");
let history = []; // Getting items which are stored in local storage
history = JSON.parse(localStorage.getItem("TODO"));
history.forEach((element) => {
  addToDo(
    element.taskName,
    element.id,
    element.count_for_cb,
    element.completed,
    element.rd1,
    element.rd2,
    element.rd3
  );
  id = Math.max(id, element.id + 1); // Selecting the id of next element ehich can be added
  count_for_cb = Math.max(count_for_cb, element.count_for_cb + 1); // Max is taken to avoid 2 elements giving same id name
});
// console.log(history);

function addToDo(toDo, id, cb, completed, rd1, rd2, rd3) {
  if (rd1) {
    //$ color=red;
    let style = "background-color:rgb(214, 63, 63)";
    if (completed) {
      style = "background-color:#808080;";
    }
    const item = `<li class="item">
			<div class="x">
			<label class="c1">
			<input type="checkbox" id="${cb}" onclick="task_high(${id},${cb})" ><span class="checkmarkforCB"></span>
			</label>
			<p class="text1" id="${id}" style="${style}">${toDo}</p>
			<button onclick="remove_task(this)" class="fas fa-trash" id="deletebutton"></button>
			</div>
		     </li>`;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
    let status = document.getElementById(cb);
    status.checked = completed;
  } else if (rd2) {
    //$ color=light blue;
    let style = "background-color:rgb(144,238,144)";
    if (completed) {
      style = "background-color:#808080;";
    }
    const item = `<li class="item">
			<div class="x">
			<label class="c1">
			<input type="checkbox" id="${cb}" onclick="task_medium(${id},${cb})" ><span class="checkmarkforCB"></span>
			</label>
			<p class="text2" id="${id}" style="${style}";">${toDo}</p>
			<button onclick="remove_task(this)" class="fas fa-trash" id="deletebutton"></button>
			</div>
		     </li>`;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
    let status = document.getElementById(cb);
    status.checked = completed;
  } else {
    //$ color=light green;
    let style = "background-color:rgb(125, 216, 247)";
    if (completed) {
      style = "background-color:#808080;";
    }
    const item = `<li class="item">
			<div class="x">
			<label class="c1">
			<input type="checkbox" id="${cb}" onclick="task_low(${id},${cb})" ><span class="checkmarkforCB"></span>
			</label>
			<p class="text3" id="${id}" style="${style}">${toDo}</p>
			<button onclick="remove_task(this)" class="fas fa-trash" id="deletebutton"></button>
			</div>
		     </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
    let status = document.getElementById(cb);
    status.checked = completed;
  }
}

//Check/Uncheck task
//HIGH Priority
function task_high(id, cb) {
  var status = document.getElementById(cb);
  var task = document.getElementById(id);
  let index = findTask(task.innerText);
  history[index].completed = status.checked;
  updateStorage();
  if (status.checked == true) {
    task.style.background = "grey";
  } else {
    task.style.background = "rgb(214, 63, 63)";
  }
}

//Medium Priority
function task_medium(id, cb) {
  var status = document.getElementById(cb);
  var task = document.getElementById(id);
  let index = findTask(task.innerText);
  history[index].completed = status.checked;
  updateStorage();
  if (status.checked == true) {
    task.style.background = "grey";
  } else {
    task.style.background = "rgb(144,238,144)";
  }
}

//LOW Priority
function task_low(id, cb) {
  var status = document.getElementById(cb);
  var task = document.getElementById(id);
  let index = findTask(task.innerText);
  console.log(history[index].completed);
  console.log(status.checked);
  history[index].completed = status.checked;
  updateStorage();
  if (status.checked == true) {
    task.style.background = "grey";
  } else {
    task.style.background = "rgb(125, 216, 247)";
  }
}

//Using ADD TASK BUTTON to add list and give priority
function addtask() {
  var flag = 1;
  //var task=document.getElementById("input");
  var task = document.querySelector("#input");
  var rd1 = document.getElementById("rd1");
  var rd2 = document.getElementById("rd2");
  var rd3 = document.getElementById("rd3");
  var text = task.value;
  if (rd1.checked == false && rd2.checked == false && rd3.checked == false) {
    alert("Please select the Priority");
    flag = 0;
  }
  if (!text) {
    alert("Please provide some task");
    flag = 0;
  }

  var a = task.value;
  if (flag == 1) {
    addToDo(a, id, count_for_cb, false, rd1.checked, rd2.checked, rd3.checked);
    let itemObj = {
      taskName: a,
      id: id,
      completed: false,
      count_for_cb: count_for_cb,
      rd1: rd1.checked,
      rd2: rd2.checked,
      rd3: rd3.checked,
    };
    history.push(itemObj);
    updateStorage();
    id++;
    count_for_cb++;
  }
  task.value = "";
  rd1.checked = false;
  rd2.checked = false;
  rd3.checked = false;
}

//Remove Button
function remove_task(e) {
  //   console.log(e.parentElement.children[1]);
  let elementToDelete = e.parentElement.children[1].innerText;
  let index = findTask(elementToDelete);
  history.splice(index, 1);
  e.parentElement.remove();
  updateStorage();
}

//ClearAll task function
function clearall() {
  if (confirm("Re you sure you want to clear the list") == true) {
    history.splice(0, history.length);
    updateStorage();
    window.location.href = window.location.href; //? To reload the screen
  } else {
  }
}

function updateStorage() {
  localStorage.setItem("TODO", JSON.stringify(history));
}

// Finds the index of task in the history array
function findTask(element) {
  let index = 0;
  for (; index < history.length; index++) {
    if (history[index].taskName == element) {
      break;
    }
  }
  if (index >= history.length) return -1;
  return index;
}
