//Date
const dateElement = document.getElementById("date");
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

const list = document.getElementById("list");
var input = document.querySelector("#input");
let LIST = [],
  id = 0,
  count_for_cb = 1000;

//! localStorage.removeItem("TODO");
let history = [];
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
  id = Math.max(id, element.id + 1);
  count_for_cb = Math.max(count_for_cb, element.count_for_cb + 1);
});
console.log(history);

function addToDo(toDo, id, cb, completed, rd1, rd2, rd3) {
  if (rd1) {
    // color=red;
    const item = `<li class="item">
			<div class="x">
			<label class="c1">
			<input type="checkbox" id="${cb}" onclick="task_high(${id},${cb})" ><span class="checkmarkforCB"></span>
			</label>
			<p class="text1" id="${id}" style="background-color:rgb(214, 63, 63);">${toDo}</p>
			<button onclick="remove_task(this)" class="fas fa-trash" id="deletebutton"></button>
			</div>
		     </li>`;

    let status = document.getElementById(cb);
    // status.checked = completed;
    // task_high(id, cb);
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
  } else if (rd2) {
    // color=light blue;
    const item = `<li class="item">
			<div class="x">
			<label class="c1">
			<input type="checkbox" id="${cb}" onclick="task_medium(${id},${cb})" ><span class="checkmarkforCB"></span>
			</label>
			<p class="text2" id="${id}" style="background-color:rgb(144,238,144);">${toDo}</p>
			<button onclick="remove_task(this)" class="fas fa-trash" id="deletebutton"></button>
			</div>
		     </li>`;

    let status = document.getElementById(cb);
    // status.checked = completed;
    // task_medium(id, cb);
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
  } else {
    // color=light green;
    const item = `<li class="item">
			<div class="x">
			<label class="c1">
			<input type="checkbox" id="${cb}" onclick="task_low(${id},${cb})" ><span class="checkmarkforCB"></span>
			</label>
			<p class="text3" id="${id}" style="background-color:rgb(125, 216, 247);">${toDo}</p>
			<button onclick="remove_task(this)" class="fas fa-trash" id="deletebutton"></button>
			</div>
		     </li>`;
    let status = document.getElementById(cb);
    // status.checked = completed;
    // task_low(id, cb);
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
  }
}

//Check/Uncheck task
//LOW Priority
function task_low(id, cb) {
  var status = document.getElementById(cb);
  var task = document.getElementById(id);
  if (status.checked == true) {
    task.style.background = "grey";
  } else {
    task.style.background = "rgb(125, 216, 247)";
  }
}

//Medium Priority
function task_medium(id, cb) {
  var status = document.getElementById(cb);
  var task = document.getElementById(id);
  if (status.checked == true) {
    task.style.background = "grey";
  } else {
    task.style.background = "rgb(144,238,144)";
  }
}

//HIGH Priority
function task_high(id, cb) {
  var status = document.getElementById(cb);
  var task = document.getElementById(id);
  if (status.checked == true) {
    task.style.background = "grey";
  } else {
    task.style.background = "rgb(214, 63, 63)";
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
    LIST.push({ name: a, id: id, trash: false, count_for_cb: count_for_cb });
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
  let ans = prompt("Are you sure you want to clear whole list?then type YES");
  if (ans == "YES") {
    /*for(let i=0;i<LIST.length();i++){
			list[i].parentElement.remove();
		}*/
    window.location.href = window.location.href;
    /*let id_of_list=0;
		var element=document.getElementById(id_of_list);
		while(element.hasChildNodes()){
		//element.removeChild(element.firstChild);
			element.parentElement.remove();
			id_of_list++;
			element=document.getElementById(id_of_list);
		}*/
  } else {
    alert("OK!");
  }
}

function updateStorage() {
  localStorage.setItem("TODO", JSON.stringify(history));
}

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