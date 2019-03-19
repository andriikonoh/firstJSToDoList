list.addEventListener('click', clickOnTask, false);

project.addEventListener("click", clickOnProject, false);

document.addEventListener("DOMContentLoaded", function() {
    renderProjects();
    renderTasks();
});

let projects = [];
let tasks = [];
let selectedProject;

function clickOnTask (event) {
    if(event.target.className === "close") {
        deleteTask(event.target.parentElement.id);
    }
    else if(event.target.className === "replace") {
        let task = event.target.parentElement;
        task.name = prompt('Change Task', event.target.parentElement.firstChild.textContent);
        task.firstChild.innerText = task.name;
        putTask(task);
    }
    else {
        event.target.classList.toggle('checked');
        event.target.classList.toggle('textDecoration');
    }
}

function clickOnProject (event) {
    if(event.target.className === "close") {
        deleteProject(selectedProject.id);
        for(let i = 0; i<tasks.length; i++) {
                if(tasks[i].projectId === selectedProject.id) {
                    deleteTask(tasks[i].id);
                }
        }
    }
    else if(event.target.className === "replace") {
        let project = event.target.parentElement;
        project.name = prompt('Change Task', event.target.parentElement.firstChild.textContent);
        project.firstChild.innerText = project.name;
        putProject(project);
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
    for(let i = 0; i < tasks.length; i++){
        if (tasks[i].projectId != selectedProject.id) {
            tasks[i].hidden = true;
        }
        else {
            tasks[i].hidden = false;
        }
    }
}

function newTask() {
    let li = document.createElement('li');
    li.name = document.getElementById('toDoEl').value;
    li.id = tasks.length+1;
    li.projectId = selectedProject.id;
    if(li.name == "") {
        alert("AddTask");
    } else {
        taskFactory(li);
        setTask(JSON.stringify(li));
    }
}
function newProject() {
    let li = document.createElement('li');
    li.name = document.getElementById('toDoProj').value;
    li.id = projects.length+1;
    if(li.name == "") {
        alert("AddProject");
    } else {
        projectFactory(li);
        projects.push(li);
        setProject(JSON.stringify(li));
    }
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

function putProject(project) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return fetch(`http://localhost:3000/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify(project),
        headers: headers
    }, {name: name})
}

function putTask(task) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: headers
    }, {name: name})
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

function deleteProject(id) {
    id = selectedProject.id;
    return fetch(`http://localhost:3000/projects/${id}`, {
        method: 'DELETE'
    })
        .then( function() {
            renderProjects();
            renderTasks();
        })
}

function deleteTask(id) {
    return fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
    })
        .then( function() {
            renderProjects();
            renderTasks();
        })
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
        for(let i = 0; i < tasks.length; i++) {
            tasks.pop();
        }
        document.getElementById('list').innerHTML = "";
        tasks = JSON.parse(tasksDTO);
        let length = tasks.length;
        for(let i = 0; i < length; i++) {
            taskFactory(tasks[i]);
        }
    })
        .catch(console.error);
}

function renderProjects() {
    getProjects()
    .then(function(projectsDTO) {
        for(let i = 0; i < projects.length; i++) {
            projects.pop();
        }
        document.getElementById('project').innerHTML = "";
        projects = JSON.parse(projectsDTO);
        let length = projects.length;
        for(let i = 0; i < length; i++) {
            projectFactory(projects[i]);
        }
    })
        .catch(console.error);
}

function projectFactory(project) {
    ///////
    let li = document.createElement('li');
    let t = document.createElement('span');
    t.innerText = project.name;
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
    li.name = project.name;
    li.id = project.id;
    select(li);
}

function taskFactory(task) {
    let li = document.createElement('li');
    let t = document.createElement('span');
    t.innerText = task.name;
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
    li.projectId = task.projectId;
    li.name = task.name;
    li.id = task.id;
    tasks.push(li);
}
