$("#submitShowPosts").on("click", function (event) {
	event.preventDefault();
	showPosts();
	$("#formShowPosts").trigger("reset");
});

function showPosts() {
	let author_name = $("#authorInputShow").val();
	//console.log(author_name);
	$(".posts-list").html("");
	getPosts(author_name);
}

function getPosts(author_name) {
	if (author_name) {
		let url = `./blogs/api/blog-posts/${author_name}`;
		let settings = {
			method : "GET",
			headers : {
				'Content-Type' : 'application/json'
			}
		}

		fetch(url, settings)
			.then(response => {
				if (response.ok) {
					console.log(response);
					return response.json();
				}
				throw new Error(response.statusText);
			})
			.then(responseJSON => {
				$(".posts-list").append(`<div class = "instructions">
											${author_name}'s posts:
										</div>`);
				displayResults(responseJSON);
			});
	}
	else {
		let url = "./blogs/api/blog-posts";
		let settings = {
			method : "GET",
			headers : {
				'Content-Type' : 'application/json'
			}
		}

		fetch(url, settings)
			.then(response => {
				if (response.ok) {
					console.log(response);
					return response.json();
				}
				throw new Error(response.statusText);
			})
			.then(responseJSON => {
				$(".posts-list").append(`<div class = "instructions">
											All posts:
										</div>`);
				displayResults(responseJSON);
			});
	}
}

function displayResults(data) {
	data.posts.forEach(item => {
		$(".posts-list").append(`	<li>
										<div>
											ID : ${item.id}
										</div>
										<div>
											Title : ${item.title}
										</div>
										<div>
											Content : ${item.content}
										</div>
										<div>
											Author : ${item.author}
										</div>
										<div>
											Publish Date : ${item.publishDate}
										</div>
									</li>`);
	});
}

$("#submitNewPost").on("click", function (event) {
	event.preventDefault();
	addPost();
	$("#formNewPost").trigger("reset");
});

postSections = {
	title : "",
	content : "",
	author : "",
	publishDate : ""
}

function addPost() {
	postSections.title = $("#titleInputNew").val();
	postSections.content = $("#contentInputNew").val();
	postSections.author = $("#authorInputNew").val();
	postSections.publishDate = $("#publishDateInputNew").val();
	$(".posts-list").html("");
	postPost(postSections);
}

function postPost(data) {
	let url = "./blogs/api/blog-posts";
	let settings = {
		method : "POST",
		headers : {
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify({title : data.title, content : data.content, author : data.author, publishDate : data.publishDate})
	}

	fetch(url, settings)
		.then(response => {
			if (response.ok) {
				console.log(response);
				return response.json();
			}
			throw new Error(response.statusText);
		}).then(responseJSON => {
			console.log(responseJSON);
			$(".posts-list").append(`<div class = "instructions">
											Added post:
										</div>`);
			displayResult(responseJSON);
		});
}

$("#submitEditPost").on("click", function (event) {
	event.preventDefault();
	editPost();
	$("#formEditPost").trigger("reset");
});

postEditionSections = {
	id : "",
	title : "",
	content : "",
	author : "",
	publishDate : ""
}

function editPost() {
	postEditionSections.id = $("#idInputEdit").val();
	postEditionSections.title = $("#titleInputEdit").val();
	postEditionSections.content = $("#contentInputEdit").val();
	postEditionSections.author = $("#authorInputEdit").val();
	postEditionSections.publishDate = $("#publishDateInputEdit").val();
	$(".posts-list").html("");	
	putPost(postEditionSections);
}

function putPost(data) {
	let url = `./blogs/api/blog-posts/${data.id}`;
	let settings = {
		method : "PUT",
		headers : {
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify({title : data.title, content : data.content, author : data.author, publishDate : data.publishDate})
	}

	fetch(url, settings)
		.then(response => {
			if (response.ok) {
				console.log(response);
				return response.json();
			}
			throw new Error(response.statusText);
		})
		.then(responseJSON => {
			console.log(responseJSON);
			$(".posts-list").append(`<div class = "instructions">
											Edited post:
										</div>`);
			displayResult(responseJSON);
		});

}

function displayResult(data) {
	$(".posts-list").append(`	
									<div>
										ID : ${data.post.id}
									</div>
									<div>
										Title : ${data.post.title}
									</div>
									<div>
										Content : ${data.post.content}
									</div>
									<div>
										Author : ${data.post.author}
									</div>
									<div>
										Publish Date : ${data.post.publishDate}
									</div>
								`);
}

$("#submitDeletePost").on("click", function (event) {
	event.preventDefault();
	eliminatePost();
	$("#formDeletePost").trigger("reset");
});

deleteParameters = {
	firstID : "",
	secondID : ""
}

function eliminatePost() {
	deleteParameters.firstID = $("#idInputDelete").val();
	deleteParameters.secondID = $("#idInputCorroborationDelete").val();
	$(".posts-list").html("");	
	deletePost(deleteParameters);
}

function deletePost(data) {
	let url = `./blogs/api/blog-posts/${data.firstID}`;
	let settings = {
		method : "DELETE",
		headers : {
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify({id : data.secondID})
	}

	fetch(url, settings)
		.then(response => {
			if (response.ok) {
				console.log(response);
				return response.json();
			}
			throw new Error(response.statusText);
		});
}