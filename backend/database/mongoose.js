const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // required for asynchronous processes
mongoose.connect('mongodb://127.0.0.1:27017/taskmanager', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})// connect database on local network w/ default port
    .then(() => console.log('database connected')) // if connected log
    .catch((error) => console.log(error));   // if error log error

module.exports = mongoose; // export the mongodb module