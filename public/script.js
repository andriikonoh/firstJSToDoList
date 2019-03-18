list.addEventListener('click', clickOnTask, false);

project.addEventListener("click", clickOnProject, false);

let projects = [];
let tasks = [];



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
                if(tasks[i].projectId === selectedProject.name) {
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
}

function select(node) {
    if(selectedProject) {
        selectedProject.firstChild.classList.remove("selected");
    }
    selectedProject = node;
    selectedProject.firstChild.classList.add("selected");
    for(let i = 0; i<tasks.length; i++){
        if (tasks[i].projectId != selectedProject.name) {
            tasks[i].hidden = true;
        }
        else {
            tasks[i].hidden = false;
        }
    }
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
    li.projectId = selectedProject.name;
    li.name = t.innerText;
    setTask(JSON.stringify(li))
    tasks.push(li);
}
function newProject() {
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
    li.name = t.innerText;
    projects.push(li);
    setProject(JSON.stringify(li));
    select(li);
}

 function setProject(data) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch("http://localhost:3000/projects", {
        method: 'POST',
        body: data,
        headers: headers
    });
} 

function getProjects() {
    return fetch("http://localhost:3000/projects")
    .then(function(response) {
        return response.json();
    })
    .then(function(projects) {
        return (JSON.stringify(projects));
    })
}

function setTask(data) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch("http://localhost:3000/tasks", {
        method: 'POST',
        body: data,
        headers: headers
    });
}

function getTasks() {
    return fetch("http://localhost:3000/tasks")
    .then(function(response) {
        return response.json();
    })
    .then(function(tasks) {
        return (JSON.stringify(tasks));
    })
}

function renderTasks() {
    getTasks()
    .then(function(tasksDTO) {
        for(let i = 0;i<tasks.length;i++) {
            tasks.pop();
        }
        document.getElementById('list').innerHTML = "";
        tasks = JSON.parse(tasksDTO);
        alert(JSON.stringify(tasks));
        let length = tasks.length;
        for(let i = 0; i<length; i++) {
            let li = document.createElement('li');
            let t = document.createElement('span');
            t.innerText = tasks[i].name;
            li.appendChild(t);
            document.getElementById('list').appendChild(li);
            document.getElementById('toDoEl').value = "";
            let btnClose = document.createElement('span');
            let btnEdit = document.createElement('span');
            btnEdit.className = "replace";
            btnClose.className = "close";
            btnEdit.innerText = " Edit";
            li.appendChild(btnEdit);
            btnClose.innerText = " X";
            li.appendChild(btnClose);
            li.projectId = tasks[i].projectId;
            li.name = tasks[i].name;
            tasks.push(li);
        }
    })
    .then( function() {
        select(selectedProject);
    })
    .catch(console.error);
}

function renderProjects() {
    getProjects()
    .then(function(projectsDTO) {
        for(let i = 0; i<projects.length; i++) {
            projects.pop();
        }
        document.getElementById('project').innerHTML = "";
        projects = JSON.parse(projectsDTO);
        let length = projects.length;
        for(let i = 0;i<length;i++) {
            let li = document.createElement('li');
            let t = document.createElement('span');
            t.innerText = projects[i].name;
            t.className = "ProjUnDone";
            li.appendChild(t);
            document.getElementById('project').appendChild(li);
            document.getElementById('toDoProj').value = "";
            let btnClose = document.createElement('span');
            let btnEdit = document.createElement('span');
            btnEdit.className = "replace";
            btnClose.className = "close";
            btnEdit.innerText = " Edit";
            li.appendChild(btnEdit);
            btnClose.innerText = " X";
            li.appendChild(btnClose);
            li.name = projects[i].name; 
            projects.push(li);
        }
    })
    .then( function() {
        select(selectedProject);
    })
    .catch(console.error);
}

