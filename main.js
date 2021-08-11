//Date
const dateElement=document.getElementById("date");
const options={weekday:"long",month:"short",day:"numeric"};
const today=new Date();
dateElement.innerHTML=today.toLocaleDateString("en-US",options);

//Priority

function priority_check()
{
	var rd1=document.getElementById("rd1");
	var rd2=document.getElementById("rd2");
	var rd3=document.getElementById("rd3");
	if(rd1.checked==false && rd2.checked==false && rd3.checked==false)
	{
		alert("Please select the Priority");
	}
}


const list=document.getElementById("list");
var input=document.querySelector("#input");
let LIST=[],id=0;

function addToDo(toDo,id,trash){
	if(trash){
	return;
	}
	//if(rd1){
	//color=red;
	//}
	//else if(rd2){
	//color=yellow;
	//}
	//if(rd3){
	//color=green;
	//}
	const item=`<li class="item">
			<div class="x">
			<p class="text" id="${id}">${toDo}</p>
			<button onclick="remove_task(this)" class="fas fa-trash" id="deletebutton"></button>
			</div>
		     </li>`;
	const position="beforeend";
	list.insertAdjacentHTML(position, item);
}
//edit n check uncheck buttons
/*<button onclick="edit_task()" id="editbutton"></button>
<button class="fas fa-check"></button>
*/

document.addEventListener("keyup",function(even){
	if(event.keyCode==13){
		var toDo=input.value;
		if(toDo){
			addToDo(toDo,id,false);
			LIST.push({name:toDo,
				   id:id,
				   trash:false
				 });
			id++;
		}
		input.value="";
	}
});

//Using ADD TASK BUTTON to add list and give priority
function addtask(){
	var flag=1;
	//var task=document.getElementById("input");
	var task=document.querySelector('#input');
	var rd1=document.getElementById("rd1");
	var rd2=document.getElementById("rd2");
	var rd3=document.getElementById("rd3");
	var text=task.value;
	if(rd1.checked==false && rd2.checked==false && rd3.checked==false){
		alert("Please select the Priority");
		flag=0;
	}
	if(!text){
		alert("Please provide some task");
		flag=0;
	}
	if(flag==1){
	
	addToDo(a,id,false);
	LIST.push({name:a,
		   id:id,
		   trash:false
		   });
	   	   id++;
	
	}
	task.value="";
	rd1.checked=false;
	rd2.checked=false;
	rd3.checked=false;
	
}




//Remove Button
function remove_task(e){
	/*
	var element=document.getElementById(id)
	element.remove();
	*/
	e.parentElement.remove();
}

//Edit Button
function edit_task(){}
