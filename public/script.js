console.log("Is Script File Loading");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOS_LIST_ID = "todos_list_div";
const  active_todo = "active_todo";
const complete_todo = "complete_todo";
const delete_todo = "delete_todo";
const NEW_TODO_INPUT_ID = "new_todo_input";

window.onload = getTodosAJAX();

function addTodoElements(id, todos_data_json){

    var todos = JSON.parse(todos_data_json);

    var parent = document.getElementById(id);

    parent.innerHTML = "";
    var active = document.getElementById(active_todo);
    active.innerHTML = "";
    var complete = document.getElementById(complete_todo);
    complete.innerHTML = "";
    var deleted = document.getElementById(delete_todo);
    deleted.innerHTML = "";

    if (parent){

        // todos { id : {todo object}, id : {todo:object} ..}
        Object.keys(todos).forEach(

            function(key) {
                var todo_element = createTodoElement(key, todos[key]);

                if(todos[key].status == "Active") {
                    active.appendChild(todo_element);
                }
                if(todos[key].status == "Complete"){
                    complete.appendChild(todo_element);
                }
                if(todos[key].status == "Deleted"){
                    deleted.appendChild(todo_element);
                }

            }
        )
    }
}

// todo_object : {title: A Task, status : ACTIVE}
function createTodoElement(id, todo_object){

    var todo_element = document.createElement("div");
    todo_element.innerHTML = todo_object.title;
    todo_element.setAttribute(
        "data-id", id
    );

    todo_element.setAttribute(
        "class", "todoStatus"+ todo_object.status + " " + "breathVertical"
    );


    if (todo_object.status == "Active"){
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
       // checkbox.setAttribute(android : paddingLeft="8mm");
        checkbox.setAttribute("onclick", "completeTodoAJAX("+id+")");
        todo_element.appendChild(checkbox);

    }

    if (todo_object.status == "Complete"){

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        checkbox.setAttribute("onclick", "activeTodoAJAX("+id+")");

        todo_element.appendChild(checkbox);
    }


    if (todo_object.status != "Deleted") {
        // Add Delete Buttons for ACTIVE, COMPLETE TODO ITEMS
        // add a delete button
        // todo_element.innerHTML = todo_object.title;
        var delete_button = document.createElement("button");
        delete_button.innerText = "Delete Todo";
        delete_button.setAttribute("onclick", "deleteTodoAJAX(" + id + ")");
        delete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(delete_button);
    }
    // todo_element.innerText = todo_object.title;
    return todo_element;
}


function getTodosAJAX(){

    // xhr - JS object for making requests to server via JS
    var xhr = new XMLHttpRequest();
    //
    xhr.open("GET", "/api/todos", true);

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE){

            if(xhr.status == STATUS_OK){
                console.log(xhr.responseText);
                 addTodoElements(TODOS_LIST_ID, xhr.responseText);
            }
        }
    }// end of callback

    xhr.send(data=null);
}

function addTodoAJAX(){

    var title= document.getElementById(NEW_TODO_INPUT_ID).value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);
    // the data in this body will be of this form
    xhr.setRequestHeader(
        "Content-type", "application/x-www-form-urlencoded");

    var data = "title=" + encodeURI(title);

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addTodoElements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }

    xhr.send(data);
}

function activeTodoAJAX(id){

    // Make a AJAX Request to update todo with the above id
    // If Response is 200 : refreshTodoElements

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "status=Active";

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addTodoElements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

function completeTodoAJAX(id){

    // Make a AJAX Request to update todo with the above id
    // If Response is 200 : refreshTodoElements

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "status=Complete";

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addTodoElements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}


function deleteTodoAJAX(id){

    // Make a AJAX Request to update todo with the above id
    // If Response is 200 : refreshTodoElements

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=Deleted";

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addTodoElements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

function hideCompleted(){
    var show = document.getElementById("hide_complete");
    var x=document.getElementById(complete_todo);
    if (x.style.display === 'none') {
        show.innerHTML="Hide completed todos";
        x.style.display = 'block';
    } else {

        show.innerHTML="Show completed todos";
        x.style.display = 'none';
    }
}
function hideDeleted(){
    var show=document.getElementById("hide_delete");
    var x = document.getElementById(delete_todo);
    if (x.style.display === 'none') {
        show.innerHTML = "Hide deleted todos";
        x.style.display = 'block';
    } else {

        show.innerHTML="Show deleted todos";
        x.style.display = 'none';
    }
}













