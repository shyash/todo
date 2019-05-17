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
	},
	collaborators:[{
		id : String,
		canView : {
			type: Boolean,
			default: true },
		canCreate : {
			type: Boolean,
			default: false },
		canEdit : {
			type: Boolean,
			default: false },
		canDelete : {
			type: Boolean,
			default: false },
		canChangeOrder : {
			type: Boolean,
			default: false },

	}]
})
const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo