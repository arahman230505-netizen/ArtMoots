// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON body

// Path to JSON file
const POSTS_FILE = path.join(__dirname, 'post.json');

// Helper function to read posts
function readPosts() {
  try {
    const data = fs.readFileSync(POSTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading posts:', err);
    return [];
  }
}

// Helper function to write posts
function writePosts(posts) {
  try {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error('Error writing posts:', err);
  }
}

// GET all posts
app.get('/posts', (req, res) => {
  const posts = readPosts();
  res.json(posts);
});

// POST a new post
app.post('/posts', (req, res) => {
  const posts = readPosts();
  const newPost = req.body;

  if (!newPost.title || !newPost.content) {
    return res.status(400).json({ error: 'Post must have a title and content.' });
  }

  // Add ID
  newPost.id = posts.length ? posts[posts.length - 1].id + 1 : 1;

  posts.push(newPost);
  writePosts(posts);
  res.status(201).json(newPost);
});

// DELETE a post by ID
app.delete('/posts/:id', (req, res) => {
  let posts = readPosts();
  const id = parseInt(req.params.id);

  const index = posts.findIndex(post => post.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found.' });
  }

  const deleted = posts.splice(index, 1)[0];
  writePosts(posts);
  res.json(deleted);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
