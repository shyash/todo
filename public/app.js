let currentList  
$(document).ready(function(){
	let currentList
 	$.getJSON("/api/lists")
 	.then(function(lists) {  
 		arrangeLists(lists)
 		getTodos(lists[0]._id,lists[0].title)
 	})
 	.catch(function(err) {
 		console.log(err)
 	})
 	 
 })

function arrangeLists(lists) {
	$(".listsLength").append(`${lists.length}`)
	if (lists.length){
		for (var i = 0; i < lists.length; i++) { 
    	  		$(".listItems").append(`
    	   			<div class="list_holder">
    	   				<div class="listTitle">${lists[i].title}</div>
    	   				<div>
    	   					<div>
									<button onclick="editList($(this))" >Edit</button>
									<button onclick="updateList($(this),'${lists[i]._id}')" >Save</button>
    	   					</div>
 							<div>
    	   						<button onclick="deleteList('${lists[i]._id}');$(this).parent().parent().parent().remove()">Delete</button>
    	   					</div>
    	   				</div>
    	  	 		</div>
    	  	 	`)
    		}
   		}
    else{
    	   $(".listItems").append(`<div class="list_holder">nothing here yet!</div>`)
    	} 
}
 
function newList() {
    $.post("/api/lists",{title: $("#newListInput").val() })
	 .then(function(data) {
	 	console.log(data)
	    let val = +document.querySelector(".listsLength").innerText + 1
	    document.querySelector(".listsLength").innerText = `${val}`
	    if (val == 1) $(".list_holder").remove()
	 	$(".listItems").append(`
	 		    <div class="list_holder">
    	   				<div class="listTitle">${$("#newListInput").val()}</div>
    	   				<div>
    	   					<div>
									<button onclick="editList($(this))" >Edit</button>
									<button onclick="updateList($(this),'${data._id}')" >Save</button>
    	   					</div>	
    	   					<div>
    	   						<button onclick="deleteList('${data._id}');$(this).parent().parent().parent().remove()">Delete</button>
    	   					</div>
    	   				</div>
    	   					
    	  	 	</div>
	 		`)
	 	$("#newListInput").val("")
	 })

}

function deleteList(id) {
	 $.ajax({
  		url: '/api/lists/'+ id,
    	type: 'DELETE',
  		success: function(data) {
  			let val = +document.querySelector(".listsLength").innerText - 1
	  		document.querySelector(".listsLength").innerText = `${val}`
	  		if (val == 0) $(".listItems").append(`<div class="list_holder">nothing here yet!</div>`)
        	console.log(data)
   		}
});
}

function editList(elem) {
	elem.parent().parent().siblings(".listTitle").html(`<input type="text" value="${elem.parent().parent().siblings(".listTitle").html()}">`)
}

function updateList(elem,id) {
	let newTitle = elem.parent().parent().siblings(".listTitle").children().val()
	 $.ajax({
  		url: '/api/lists/'+ id,
    	type: 'PUT',
    	data: {title: newTitle},
  		success: function(data) {
  			elem.parent().parent().siblings(".listTitle").html(`${data.title}`)
        	console.log(data)
   		}
});
}

function getTodos(listId,listTitle) {
	$(".todoItems").html("")
	$(".list").html("")
	$(".todosLength").html("")
	currentList = listId 
	$.getJSON("/api/lists/"+listId+"/todos")
 	.then(function(todos) { 
 		arrangeTodos(todos,listTitle)
 	})
 	.catch(function(err) {
 		console.log(err)
 	})
}

function arrangeTodos(todos,listTitle){
	$(".list").append(`${listTitle}`)
	$(".todosLength").append(`${todos.length}`)
		if (todos.length){
			for (var i = 0; i < todos.length; i++) { 
    	  		$(".todoItems").append(`
    	   			<div class="todo_holder">
    	   				<div class="todoTitle">${todos[i].name}</div>
    	   				<div>
    	   					<div>
									<button onclick="editTodo($(this))" >Edit</button>
									<button onclick="updateTodo($(this),'${todos[i]._id}')" >Save</button>
    	   					</div>
 							<div>
    	   						<button onclick="deleteTodo('${todos[i]._id}');$(this).parent().parent().parent().remove()">Delete</button>
    	   					</div>
    	   				</div>
    	  	 		</div>
    	  	 	`)
    		}
   		}
    else{
    	   $(".todoItems").append(`<div class="todo_holder">nothing here yet!</div>`)
    	}
}
function newTodo() {
	$.post("/api/lists/"+currentList+"/todos",{name: $("#newTodoInput").val()})
	 .then(function(data) {
	 	console.log(data)
	    let val = +document.querySelector(".todosLength").innerText + 1
	    document.querySelector(".todosLength").innerText = `${val}`
	    if (val == 1) $(".todo_holder").remove()
	 	$(".todoItems").append(`
	 		    <div class="todo_holder">
    	   				<div class="todoTitle">${$("#newTodoInput").val()}</div>
    	   				<div>
    	   					<div>
									<button onclick="editTodo($(this))" >Edit</button>
									<button onclick="updateTodo($(this),'${data._id}')" >Save</button>
    	   					</div>	
    	   					<div>
    	   						<button onclick="deleteTodo('${data._id}');$(this).parent().parent().parent().remove()">Delete</button>
    	   					</div>
    	   				</div>
    	   					
    	  	 	</div>
	 		`)
	 	$("#newTodoInput").val("")
	 })
}
function deleteTodo(id) {
	 $.ajax({
  		url: '/api/lists/'+currentList+'/todos/'+id,
    	type: 'DELETE',
  		success: function(data) {
  			let val = +document.querySelector(".todosLength").innerText - 1
	  		document.querySelector(".todosLength").innerText = `${val}`
	  		if (val == 0) $(".todoItems").append(`<div class="todo_holder">nothing here yet!</div>`)
        	console.log(data)
   		}
});
}

function editTodo(elem) {
	elem.parent().parent().siblings(".todoTitle").html(`<input type="text" value="${elem.parent().parent().siblings(".todoTitle").html()}">`)
}

function updateTodo(elem,id) {
	let newName = elem.parent().parent().siblings(".todoTitle").children().val()
	 $.ajax({
  		url: '/api/lists/'+currentList+'/todos/'+id,
    	type: 'PUT',
    	data: {name: newName},
  		success: function(data) {
  			elem.parent().parent().siblings(".todoTitle").html(`${data.name}`)
        	console.log(data)
   		}
});
}
