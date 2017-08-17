var createGist = function(file_name, content, description, token){

	var dataObject = Object.assign({}, {
        'public':   true,
        'description': "",
        'files': {}
        }
       )

	dataObject.description = description
	dataObject.files[file_name] = {}
	dataObject.files[file_name].content = content 


	$.ajax({
	  url: 'https://api.github.com/gists',
	  type: 'POST',
	  dataType: 'json',
	  headers: {
	    Authorization: "token " + token
	  },
	  data: JSON.stringify(dataObject)
	})


};

var myGists = function (username, token){
	$.ajax({
	  url: 'https://api.github.com/users/' + username + '/gists',
	  type: 'GET',
	  dataType: 'json',
	  headers: {
	    Authorization: "token " + token
	  }
	})

};

var bindCreateButton = function() {
  // call functions here

};

$(document).ready(function(){
	document.getElementById("submit").addEventListener("click", function(e){
		e.preventDefault()
		var fileName = document.getElementById("file_name")
		var content = document.getElementById("content")
		var token = document.getElementById("token")
		var description = document.getElementById("description")
		console.log("I was clicked!")
		createGist(fileName, content, description, token)
	})
});