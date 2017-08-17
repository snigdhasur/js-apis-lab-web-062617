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

	}).done(function(data){
	  	console.log(data)
	  	var usernameInput = data.owner.login
	  	myGists(usernameInput, token)
	  })
};

var myGists = function (username, token){
	$.ajax({
	  url: 'https://api.github.com/users/' + username + '/gists',
	  type: 'GET',
	  dataType: 'json',
	  headers: {
	    Authorization: "token " + token
	  }, 
	  success: function(data) {
	  	console.log(data)
	  	let parentEl = document.getElementById("public-gists")
	  	gistsHTML = data.map(data => `<li><a href=${data.html_url}>${data.description}</a></li>`).join("")
	  	parentEl.innerHTML =  
	  	` <ul>
	  		${gistsHTML}
	  	  </ul>
	  	`
	  }

	})

};

var bindCreateButton = function() {
  // call functions here
  document.getElementById("submit").addEventListener("click", function(e){
		e.preventDefault()
		var fileName = document.getElementById("file_name").value
		var content = document.getElementById("content").value
		var token = document.getElementById("token").value
		var description = document.getElementById("description").value
		createGist(fileName, content, description, token)
		console.log("I was clicked!")
	})


};

$(document).ready(function(){
	bindCreateButton()
});