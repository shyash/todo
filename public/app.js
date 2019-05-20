$(document).ready(function(){
 	$.getJSON("/api/lists")
 	.then(function(lists) {
 		arrangeLists(lists)
 	})
 	.catch(function(err) {
 		console.log(err)
 	})
 	 
 })

function arrangeLists(lists) {
	if (lists.length) {
		$(".listsLength").append(`${lists.length}`)
 	 		for (var i = 0; i < lists.length; i++) { 
    	  		$(".listItems").append(`
    	   			<div class="list_holder">
    	   				<div>${lists[i].title}</div>
    	   				<div>
    	   					<div>
									<button onclick="edit(this)" >Edit</button>
									<button>Save</button>
    	   					</div>
 							<div>
    	   						<button onclick="deleteList('${lists[i]._id}');$(this).parent().parent().remove()">Delete</button>
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