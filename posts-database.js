// posts-database.js

// Base URL of your server
const API_URL = "http://localhost:3000/posts";

// Get all posts
async function getPosts() {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    return [];
  }
}

// Add a new post
async function addPost(post) {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
  } catch (err) {
    console.error("Failed to add post:", err);
  }
}

// Edit a post (only editable by author)
async function editPostDB(id, updatedPost) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    });
  } catch (err) {
    console.error("Failed to edit post:", err);
  }
}

// Delete a post
async function deletePostDB(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (err) {
    console.error("Failed to delete post:", err);
  }
}
