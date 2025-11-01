// posts-database.js
let posts = JSON.parse(localStorage.getItem("posts") || "[]");

// Get all posts
function getPosts() {
  return posts;
}

// Add a post
function addPost(post) {
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));
}

// Edit a post
function editPostDB(index, newData) {
  if(posts[index]){
    posts[index] = {...posts[index], ...newData};
    localStorage.setItem("posts", JSON.stringify(posts));
  }
}

// Delete a post
function deletePostDB(index) {
  if(posts[index]){
    posts.splice(index,1);
    localStorage.setItem("posts", JSON.stringify(posts));
  }
}
