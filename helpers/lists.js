const db = require("../models")

exports.getLists = function(req,res) {
	db.User.findOne({"_id":req.user._id})
	.then(function(user) {
		res.status(200).json(user.lists)
	})
	.catch(function(err) {
		res.send(err)
	})
}

exports.createList = function(req,res) {
	db.User.findOne({"_id":req.user._id}) 
	.then(function(user) {
		user.lists.push(req.body)
		user.save()
		.then(function(saved) {
			res.status(201).json(saved.lists[saved.lists.length-1])
		})
		.catch(function(err) {
		res.send(err)
	})
	})
	.catch(function(err) {
		res.send(err)
	})
}

exports.getList = function(req,res) {
	let i
	db.User.findOne({"_id":req.user._id})
	.then(function(user) {
		 for (i = 0; i < user.lists.length; i++) {

			 if(user.lists[i]._id == req.params.listId) break
		  } 
			 res.status(200).json(user.lists[i])
	 })

	.catch(function(err) {
		res.send(err)
	})
}

exports.updateList = function(req,res) {
	let i
	db.User.findOne({"_id":req.user._id})
	.then(function(user) {
		 for ( i = 0; i < user.lists.length; i++) {
			  if(user.lists[i]._id == req.params.listId){
			 		user.lists[i].title = req.body.title
			        break
			   }
		  } 
			 user.save()
			 .then(function(saved) {
			 	res.status(200).json(saved.lists[i])
			  })
			 .catch(function(err) {
		        res.send(err)
	          }) 
    })
	.catch(function(err) {
		res.send(err)
	})
}

exports.deleteList = function(req,res) {
	db.User.findOne({"_id":req.user._id})
	.then(function(user) {
		 for (let i = 0; i < user.lists.length; i++) {
			  if(user.lists[i]._id == req.params.listId){
			 	 user.lists.splice(i,1)
			     break
			  }
		 } 
		      user.save()
			  .then(function(saved) {
		    	res.status(202).json({message : "deleted"})
				})
			  .catch(function(err) {
				 res.send(err)
	 			}) 
  	 })
     .catch(function(err) {
		res.send(err)
	 })
}

exports.getCollabLists = function(req,res) {
	let arr = []
	db.User.find({})
	.then(function(j) {
		for (let i = 0; i < user.length; i++) {
			 for (let j = 0; j < user[i].lists.length; j++) {
			 	for (let k = 0; k < user[i].lists[j].collaborators.length; k++) {
			 		if(user[i].lists[j].collaborators[k].name == req.params.name){
			 			arr.push(user[i].lists[j])
			 			break
			 		}
			 	}
			 }
		}
		res.status(200).json(arr)
	})
	.catch(function(err) {
		res.send(err)
	})
}
exports.addCollab = function(req,res) {
	let i
	db.User.findOne({"_id":req.user._id})
	.then(function(user) {
		  for ( i = 0; i < user.lists.length; i++) {
			   if(user.lists[i]._id == req.params.listId){
			 	  user.lists[i].collaborators.push({"id": req.params.collabId})
			      break
			     }
		  } 
		 		user.save()
				.then(function(saved) {
					res.status(201).json(saved.lists[i])
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
	let i
    db.User.findOne({"_id":req.user._id})
	.then(function(user) {
			for ( i = 0; i < user.lists.length; i++) {
				 if(user.lists[i]._id == req.params.listId){
			 			for (let j = 0; j < user.lists[i].collaborators.length; j++) {
								if(user.lists[i].collaborators[j]._id == req.params.collabId){
					  			   user.lists[i].collaborators.splice(j,1)
				       			   break
								}
						}
			        break
				  }
		    } 
				 user.save()
				 .then(function(saved) {
					res.status(202).json(saved.lists[i])
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
	let i
	db.User.findOne({"_id":req.user._id})
	.then(function(user) {
		  for (  i = 0; i < user.lists.length; i++) {
			   if(user.lists[i]._id == req.params.listId){
			 	    for (let j = 0; j < user.lists[i].collaborators.length; j++) {
					    if(user.lists[i].collaborators[j]._id == req.params.collabId){
 						  
						    if (req.body.view != undefined ) user.lists[i].collaborators[j].canView = true
					 			else { //if view permission is disabled then all permissions
				  					    user.lists[i].collaborators[j].canView = false
				  					    user.lists[i].collaborators[j].canCreate = false
										user.lists[i].collaborators[j].canEdit = false
										user.lists[i].collaborators[j].canDelete = false
										user.lists[i].collaborators[j].canChangeOrder = false		  
				      				   break
				      				  }

							if (req.body.create != undefined) user.lists[i].collaborators[j].canCreate = true
							  else user.lists[i].collaborators[j].canCreate = false
							if (req.body.edit != undefined) user.lists[i].collaborators[j].canEdit = true
							  else user.lists[i].collaborators[j].canEdit = false
							if (req.body.delete != undefined) user.lists[i].collaborators[j].canDelete = true
							  else user.lists[i].collaborators[j].canDelete = false
							if (req.body.changeOrder != undefined) user.lists[i].collaborators[j].canChangeOrder = true
							  else user.lists[i].collaborators[j].canChangeOrder = false
			
							break
						}
			    	}
			     break
			    }
			} 
				 user.save()
				 .then(function(saved) {
					 res.status(200).json(saved.lists[i])
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
	let i
	db.User.findOne({"_id":req.user._id})
	.then(function(user) {
			for (  i = 0; i < user.lists.length; i++) {
				 if(user.lists[i]._id == req.params.listId) break
			 } 
		  		res.status(200).json(user.lists[i].todos)
	})
	.catch(function(err) {
		res.send(err)
	})
}

exports.createTodo = function(req,res) {
	let i
	db.User.findOne({"_id":req.user._id})
	.then(function(user) {
		    for ( i = 0; i < user.lists.length; i++) {
			 	if(user.lists[i]._id == req.params.listId) {
			 		 user.lists[i].todos.push({"name": req.body.name,"index" : user.lists[i].todos.length})
			     break
			    }
		     } 	 
				user.save()
				.then(function(saved) {
					res.status(201).json(saved.lists[i].todos[saved.lists[i].todos.length-1])
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
	let i
	db.User.findOne({"_id":req.user._id})
	.then(function(user) {
			for ( i = 0; i < user.lists.length; i++) {
			 	if(user.lists[i]._id == req.params.listId) {
			 	 	for (let j = 0; j < user.lists[i].todos.length; j++) {
						user.lists[i].todos[j].index = JSON.parse(req.body.arr)[j]
					}
			     break
			    }
		    } 	 
				user.save()
				.then(function(saved) {
					res.status(200).json(saved.lists[i])
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
	let i,j
	db.User.findOne({"_id":req.user._id})
	.then(function(user) {
			for ( i = 0; i < user.lists.length; i++) {
			 	if(user.lists[i]._id == req.params.listId) {
			 	 	for ( j = 0; j < user.lists[i].todos.length; j++) {
						if(user.lists[i].todos[j]._id == req.params.todoId){
							 user.lists[i].todos[j].name = req.body.name
				 		 break
						}
					}

			     break
			 	}
			} 	 
		        user.save()
		        .then(function(saved) {
		        	res.status(200).json(saved.lists[i].todos[j])
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
	let i
	db.User.findOne({"_id":req.user._id})
	.then(function(user) {
			for ( i = 0; i < user.lists.length; i++) {
				if(user.lists[i]._id == req.params.listId) {
			 		for (let j = 0; j < user.lists[i].todos.length; j++) {
						if(user.lists[i].todos[j]._id == req.params.todoId){
							 user.lists[i].todos.splice(j,1)
				 		break
						}
					}
			     break
				 }
			} 	 
					user.save()
					.then(function(saved) {
						res.status(202).json(saved.lists[i])
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