const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Model/TodoModel')



const app = express();
app.use(cors());
app.use(express.json())

mongoose.connect('mongodb://0.0.0.0:27017/todolist')

// get request
app.get('/get', (req, res) => {
TodoModel.find()
.then(result => res.json(result))
.catch(err=> res.json(err))
})

//update request
app.put('/put/:id', (req,res) => {
   const  {id} = req.params;
     TodoModel.findByIdAndUpdate({_id : id}, {done: true})
     .then(result => res.json(result))
     .catch(err => res.json(err))
})

//for delete request
app.delete('/delete/:id', (req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .then(err => res.json(err))
})




// for post request
app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => res.json(err))
})

app.listen(3001, () => console.log('app running on port 3001'))