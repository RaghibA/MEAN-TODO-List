const mongoose = require('mongoose');

// making the list schema
const listSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true, 
        minLength: 1
    }
});

// create our model
const List = mongoose.model('List', listSchema);

// export the list model
module.exports = List;