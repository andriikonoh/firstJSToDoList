list.addEventListener('click', clickOnTask, false);

project.addEventListener("click", clickOnProject, false);

let projects = [];
let tasks = [];
let projectId = 0;

function clickOnTask (event) {
    if(event.target.className === "close") {
        event.target.parentElement.remove();
    }
    else if(event.target.className === "replace"){
        event.target.parentElement.firstChild.innerText =
            prompt('Change Task', event.target.parentElement.firstChild.textContent);;
    }
    else {
        event.target.classList.toggle('checked');
        event.target.classList.toggle('textDecoration');
    }
}

let selectedProject;
function clickOnProject (event) {
    if(event.target.className === "close") {
        event.target.parentElement.remove();
        for(let i = 0; i<tasks.length; i++) {
                if(tasks[i].projectId === selectedProject.id) {
                    tasks[i].remove();
                }
        }
    }
    else if(event.target.className === "replace"){
        event.target.parentElement.firstChild.innerText =
            prompt('Change Task', event.target.parentElement.firstChild.textContent);;
    }
    else{
        select(event.target.parentElement);
    }
    for(let i = 0; i<tasks.length; i++){
        if (tasks[i].projectId != selectedProject.id) {
            tasks[i].hidden = true;
        }
        else {
            tasks[i].hidden = false;
        }
    }
}

function select(node) {
    if(selectedProject) {
        selectedProject.firstChild.classList.remove("selected");
    }
    selectedProject = node;
    selectedProject.firstChild.classList.add("selected");
}

function newElement() {
    let li = document.createElement('li');
    let inputValue = document.getElementById('toDoEl').value;
    let t = document.createElement('span');
    t.innerText = inputValue;
    li.appendChild(t);
    if(inputValue == "") {
       alert("AddTask");
    } else {
       document.getElementById('list').appendChild(li);
    }
    document.getElementById('toDoEl').value = "";
    let btnClose = document.createElement('span');
	let btnEdit = document.createElement('span');
    btnEdit.className = "replace";
    btnClose.className = "close";
    btnEdit.innerText = " Edit";
	li.appendChild(btnEdit);
    btnClose.innerText = " X";
    li.appendChild(btnClose);
    li.projectId = selectedProject.id;
    tasks.push(li);
}
async function newProject() {
    await GetProject();

    let li = document.createElement('li');
    let inputValue = document.getElementById('toDoProj').value;
    let t = document.createElement('span');
    t.innerText = inputValue;
    t.className = "ProjUnDone";
    li.appendChild(t);
    if(inputValue == "") {
        alert("AddProject");
    } else {
        document.getElementById('project').appendChild(li);
    }
    document.getElementById('toDoProj').value = "";
    let btnClose = document.createElement('span');
    let btnEdit = document.createElement('span');
    btnEdit.className = "replace";
    btnClose.className = "close";
    btnEdit.innerText = " Edit";
    li.appendChild(btnEdit);
    btnClose.innerText = " X";
    li.appendChild(btnClose);
    li.id = projectId;
    projects.push(li);
    projectId++;
    select(li);
}

async function GetProject() {
    const response = await fetch("localhost:3000/projects");
    const data = await response.json();
    projects = JSON.parse(JSON.stringify(data));
}

