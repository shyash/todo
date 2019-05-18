const db = require("../models")

exports.getLists = function(req,res) {
	db.List.find()
	.then(function(lists) {
		res.json(lists)
	})
	.catch(function(err) {
		res.send(err)
	})
}
exports.createList = function(req,res) {
	db.List.create(req.body)
	.then(function(newList) {
		res.status(201).json(newList)
	})
	.catch(function(err) {
		res.send(err)
	})
}

exports.getList = function(req,res) {
	db.List.findById(req.params.listId)
	.then(function(foundList) {
		res.json(foundList)
	})
	.catch(function(err) {
		res.send(err)
	})
}

exports.updateList = function(req,res) {
	db.List.findOneAndUpdate({_id: req.params.listId},req.body,{new : true})
	.then(function(list) {
		res.json(list)
	})
	.catch(function(err) {
		res.send(err)
	})
}

exports.deleteList = function(req,res) {
	db.List.deleteOne({_id:req.params.listId})
	.then(function() {
		res.json({message : "deleted"})
	})
	.catch(function(err) {
		res.send(err)
	})
}

exports.addCollab = function(req,res) {
	db.List.findOne({_id:req.params.listId})
	.then(function(foundList) {
		foundList.collaborators.push({"id": req.params.collabId})
		foundList.save()
		.then(function(saved) {
			res.json(saved)
		})
		.catch(function(err) {
		res.send(err)
	})
	})
	.catch(function(err) {
		res.send(err)
	})
}

exports.deleteCollab = function(req,res) {
	db.List.findOne({_id:req.params.listId})
	.then(function(foundList) {
		for (let i = 0; i < foundList.collaborators.length; i++) {
			if(foundList.collaborators[i]._id == req.params.collabId){
				 foundList.collaborators.splice(i,1)
				 break
			}
		}
		foundList.save()
		.then(function(saved) {
			res.json(saved)
		})
		.catch(function(err) {
		res.send(err)
	})
	})
	.catch(function(err) {
		res.send(err)
	})
}

exports.updateCollab = function(req,res) {
	db.List.findOne({_id:req.params.listId})
	.then(function(foundList) {
		for (let i = 0; i < foundList.collaborators.length; i++) {
			if(foundList.collaborators[i]._id == req.params.collabId){
				let viewPermission = true 
				if (req.body.view != undefined ) foundList.collaborators[i].canView = true
					 else { //if view permission is disabled then all permissions
				  		foundList.collaborators[i].canView = false
				  		viewPermission = false
				        break }

				if (req.body.create != undefined && viewPermission) foundList.collaborators[i].canCreate = true
				  else foundList.collaborators[i].canCreate = false
				if (req.body.edit != undefined && viewPermission) foundList.collaborators[i].canEdit = true
				  else foundList.collaborators[i].canEdit = false
				if (req.body.delete != undefined && viewPermission) foundList.collaborators[i].canDelete = true
				  else foundList.collaborators[i].canDelete = false
				if (req.body.changeOrder != undefined && viewPermission) foundList.collaborators[i].canChangeOrder = true
				  else foundList.collaborators[i].canChangeOrder = false

				break
			}
		}
		foundList.save()
		.then(function(saved) {
			res.json(saved)
		})
		.catch(function(err) {
		res.send(err)
	})
	})
	.catch(function(err) {
		res.send(err)
	})
}

// Todo Routes

exports.getTodos = function(req,res) {
	db.List.findOne({_id:req.params.listId})
	.then(function(foundList) {
		res.json(foundList.todos)
	})
	.catch(function(err) {
		res.send(err)
	})
}

exports.createTodo = function(req,res) {
	db.List.findOne({_id:req.params.listId})
	.then(function(foundList) {
		foundList.todos.push({"name": req.body.name,"index" : foundList.todos.length})
		foundList.save()
		.then(function(saved) {
			res.json(saved)
		})
		.catch(function(err) {
		res.send(err)
	})
	})
	.catch(function(err) {
		res.send(err)
	})
}

exports.changeTodosOrder = function(req,res) {
	db.List.findOne({_id:req.params.listId})
	.then(function(foundList) {
		for (let i = 0; i < foundList.todos.length; i++) {
			foundList.todos[i].index = JSON.parse(req.body.arr)[i]
		}
		foundList.save()
		.then(function(saved) {
			res.json(saved)
		})
		.catch(function(err) {
		res.send(err)
	})
	})
	.catch(function(err) {
		res.send(err)
	})
}

exports.updateTodo = function(req,res) {
	db.List.findOne({_id:req.params.listId})
	.then(function(foundList) { 
		for (let i = 0; i < foundList.todos.length; i++) {
			if(foundList.todos[i]._id == req.params.todoId){
				 foundList.todos[i].name = req.body.name
				 break
			}
		}
		foundList.save()
		.then(function(saved) {
			res.json(saved)
		})
		.catch(function(err) {
		res.send(err)
	})
	})
	.catch(function(err) {
		res.send(err)
	})
}

exports.deleteTodo = function(req,res) {
	db.List.findOne({_id:req.params.listId})
		.then(function(foundList) { 
		for (let i = 0; i < foundList.todos.length; i++) {
			if(foundList.todos[i]._id == req.params.todoId){
				 foundList.todos.splice(i,1)
				 break
			}
		}
		foundList.save()
		.then(function(saved) {
			res.json(saved)
		})
		.catch(function(err) {
		res.send(err)
	})
	})
	.catch(function(err) {
		res.send(err)
	})
}

module.exports = exports