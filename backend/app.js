const express = require('express');
const app = express();

const mongoose = require('./database/mongoose')

// import models
const List = require('./database/models/list');
const Task = require('./database/models/task');

// enable app to parse json data
app.use(express.json())

// enable cors with following code
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Required-With, Content-Type, Accept");
    next();
});

// create routes: url endpoints that the app will request data from [RESTful API]
// List: Create, Update, ReadOne, ReadAll, Delete

// get request for lists
app.get('/lists', (req, res) => {
    List.find({})
        .then(lists => res.send(lists))
        .catch(error => console.log(error));
})

// save lists - post request
app.post('/lists', (req, res) => {  // post request
    (new List({'title': req.body.title}))  // create new list title
        .save()                                 // save the post
        .then((list) => res.send(list))         // get list back and send to user
        .catch(error => console.log(error)); 
});

// Get List by ID
app.get('/lists/:listId', (req, res) => {
    List.find({ _id: req.params.listId})    // find list by ID
        .then((list) => res.send(list))     // then send list 
        .catch(error => console.log(error));
});

// update with patch
// put updates the entire document, while patch updates a signle field
app.patch('/lists/:listId', (req, res) => {
    List.findOneAndUpdate( { '_id': req.params.listId }, { $set: req.body}) // find list by id, update the title
        .then((list) => res.send(list))     // then send list 
        .catch(error => console.log(error));
});

// delete list by id
app.delete('/lists/:listId', (req, res) => {
    const deleteTasks = (list) => {
        Task.deleteMany({_listId: list._id})
            .then(() => list)
            .catch((error) => console.log(error));
    }
    const list = List.findByIdAndDelete(req.params.listId)
        .then((list) => deleteTasks(list))
        .catch((error) => console.log(error));
    res.status(200).send(list)
});

// Task: Create, Update, ReadOne, ReadAll, Delete
// url structure: localhost:8000/lists/:listId/tasks/:taskId
// tasks are specific to lists, so first we find list by ID, and then task by ID on that list

// get all tasks
app.get('/lists/:listId/tasks', (req, res) => {
    Task.find( {_listId: req.params.listId })
        .then((tasks) => res.send(tasks))
        .catch((error) => console.log(error));
});

// save a task
app.post('/lists/:listId/tasks', (req, res) => {
    (new Task({ '_listId': req.params.listId, 'title': req.body.title }))
        .save()
        .then((tasks) => res.send(tasks))
        .catch((error) => console.log(error));
});

// get single task
app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.find( {_listId: req.params.listId, _id: req.params.taskId })
        .then((task) => res.send(task))
        .catch((error) => console.log(error));
});

// update task
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate( {_listId: req.params.listId, _id: req.params.taskId }, { $set: req.body})
        .then((task) => res.send(task))
        .catch((error) => console.log(error));
});

// delete task
// update task
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete( {_listId: req.params.listId, _id: req.params.taskId }, { $set: req.body})
        .then((task) => res.send(task))
        .catch((error) => console.log(error));
});

app.listen(8000, () => console.log('test'))