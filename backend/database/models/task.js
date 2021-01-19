const mongoose = require('mongoose');

// making the task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true, 
        minLength: 1
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    }
});

// create module
const Task = mongoose.model('Task', taskSchema);

// export 
module.exports = Task;