var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if(ev.target.tagName === "LI") {
       ev.target.classList.toggle('checked');
    } else if(ev.target.tagName === "BUTTON") {
       var div = ev.target.parentNode;
       div.remove();
    }
	else if(ev.target.tagName === "SPAN"){
		var txtChng2 = prompt('Change Task', ev.target.parentNode.firstChild.nodeValue);
		ev.target.parentNode.firstChild.nodeValue = txtChng2;
		//console.log(ev.target.parentNode.firstChild.nodeValue);
		//ev.target.replaceChild(toDoEl, txtChng2);
	}
}, false);

function newElement() {
    var li = document.createElement('li');
    var inputValue = document.getElementById('toDoEl').value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if(inputValue == "") {
       alert("AddTask");
    } else {
       document.getElementById('list').appendChild(li);
    }
    document.getElementById('toDoEl').value = "";
    var btn = document.createElement('BUTTON');
    var txt = document.createTextNode("X");
	var span = document.createElement('SPAN');
	var txtChng = document.createTextNode("     Edit");
	span.className = "replace";
    btn.className = "close";
	span.appendChild(txtChng);
	li.appendChild(span);
    btn.appendChild(txt);
    li.appendChild(btn);
} 

