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
    	   				<div>${$("#newListInput").val()}</div>
    	   				<div>
    	   					<div>
									<button onclick="edit(this)" >Edit</button>
									<button>Save</button>
    	   					</div>	
    	   					<div>
    	   						<button onclick="deleteList('${data._id}');$(this).parent().parent().remove()">Delete</button>
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
	elem.ty
}