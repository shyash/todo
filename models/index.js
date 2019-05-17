const mongoose = require("mongoose");
const DBURI = process.env.DBURI || 'mongodb://localhost/todo';
mongoose.set('debug', true)
mongoose.connection.openUri(DBURI, {useNewUrlParser:  true, useFindAndModify: false})
mongoose.Promise = Promise

module.exports.Todo = require("./todo")