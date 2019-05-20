const express = require("express");
const router 	= express.Router();
const db = require("../models")
const helpers = require("../helpers/lists")

router.route("/")
				.get(helpers.getLists)
				.post(helpers.createList)

router.route("/:listId")
				.get(helpers.getList)
				.put(helpers.updateList)
				.delete(helpers.deleteList)

router.route("/:listId/todos")
				.get(helpers.getTodos)
				.put(helpers.changeTodosOrder)
				.post(helpers.createTodo)

router.route("/:listId/todos/:todoId")
				.put(helpers.updateTodo) 
				.delete(helpers.deleteTodo) 

router.route("/:listId/collab/:collabName")
				.put(helpers.updateCollab)
				.post(helpers.addCollab)
				.delete(helpers.deleteCollab)

module.exports = router