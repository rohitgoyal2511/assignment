const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const todos_db = require("./seed.js");

const app = express();
app.use("/", bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));

app.use('/', express.static(__dirname + '/public'))

app.get('/api/todos', function(req, res) {
    res.json(todos_db.todos);
});

app.post('/api/todos', function(req, res){
    var todo_title = req.body.title;
    if(!todo_title || todo_title == "" || todo_title.trim() == ""){
        res.status(404).json({error : "Please enter a valid title"});
    }
    else {
        var new_todo = {
            title: req.body.title,
            status: todos_db.statusENUMS.Active
        }

        todos_db.todos[todos_db.next_todo_id] = new_todo;
        todos_db.next_todo_id += 1;
        res.json(todos_db.todos);
    }
})

app.put('/api/todos/:id', function(req, res){
    if(req.params.id >= todos_db.next_todo_id)
        res.status(404).json({error : "There is no such todo with this id"});

    var todo_status = req.body.status;
    if(!todo_status || todo_status == "" || todo_status.trim() == ""){
        res.status(404).json({error : "Please enter a valid status"});
    }
    else{
        if (todo_status == todos_db.statusENUMS.Active || todo_status == todos_db.statusENUMS.Complete){
            todos_db.todos[req.params.id].status = req.body.status;
        }
        else
            res.status(404).json({error : "You can't have permission to set this status"});
    }
    res.json(todos_db.todos);
});

app.delete('/api/todos/:id', function(req, res){
    var id = req.params.id;
    if(id >= todos_db.next_todo_id)
        res.status(404).json({error : "There is no such todo with this id"});
    else
        todos_db.todos[id].status = todos_db.statusENUMS.Deleted;
    res.json(todos_db.todos);
});

app.get('/api/todos/active', function(req,res){
    res.json(printAll("Active"));
});

app.get('/api/todos/complete', function(req,res){
    res.json(printAll("Complete"));
});

app.get('/api/todos/deleted', function(req,res){
    res.json(printAll("Deleted"));
});

app.put('/api/todos/complete/:id', function(req,res){
    var id = req.params.id;
    if(id >= todos_db.next_todo_id)
        res.status(404).json({error : "There is no such todo with this id"});
    todos_db.todos[id].status = "Complete";
    res.json(todos_db.todos);
});

app.put('/api/todos/active/:id', function(req,res){
    var id = req.params.id;
    if(id >= todos_db.next_todo_id)
        res.status(404).json({error : "There is no such todo with this id"});
    todos_db.todos[id].status = "Active";
    res.json(todos_db.todos);
});

function printAll(status){
    var obj = {};
    var count = 0;
    var i = 1;
    while(i < todos_db.next_todo_id){
        if(todos_db.todos[i].status == status){
            obj[i] = todos_db.todos[i];
            count++;
        }
        i++;
    }
   return obj
}

app.listen(4000);

