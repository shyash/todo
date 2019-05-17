const mongoose = require("mongoose")
const todoSchema = new mongoose.Schema({
	name:{
		type: String,
		require: 'Please fill the Name!'
	},
	completed:{
		type:Boolean,
		default: false
	},
	date:{
		type: Date,
		default: Date.now
	}
})
const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo