const API_URL = "http://localhost:3000/posts";

// Get all posts
async function getPosts() {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (err) {
    console.error("Error fetching posts:", err);
    return [];
  }
}

// Add a new post
async function addPost(post) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    });
    return await res.json();
  } catch (err) {
    console.error("Error adding post:", err);
  }
}

// Edit a post
async function editPostDB(id, updatedData) {
  try {
    const posts = await getPosts();
    const postToUpdate = posts.find(p => p.id === id);
    if(!postToUpdate) throw new Error("Post not found");

    const updatedPost = { ...postToUpdate, ...updatedData };

    // Delete old post and add updated one (simplest way with current server)
    await deletePostDB(id);
    await addPost(updatedPost);
  } catch (err) {
    console.error("Error editing post:", err);
  }
}

// Delete a post
async function deletePostDB(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (err) {
    console.error("Error deleting post:", err);
  }
}
