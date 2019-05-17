const express = require("express");
const router 	= express.Router();
const db = require("../models")
const helpers = require("../helpers/todos")

router.route("/")
				.get(helpers.getTodos)
				.post(helpers.createTodo)

router.route("/:todoId")
				.get(helpers.getTodo)
				.put(helpers.updateTodo)
				.delete(helpers.deleteTodo)

router.route("/:todoId/addCollab/:collabId")
				.post(helpers.addCollab)

module.exports = router