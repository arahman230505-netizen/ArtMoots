const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple "database" in a JSON file
const DB_FILE = "./posts.json";

// Helper functions
function getPosts() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function savePosts(posts) {
  fs.writeFileSync(DB_FILE, JSON.stringify(posts, null, 2));
}

// Get all posts
app.get("/posts", (req, res) => {
  res.json(getPosts());
});

// Add a post
app.post("/posts", (req, res) => {
  const posts = getPosts();
  posts.push(req.body);
  savePosts(posts);
  res.json({ success: true });
});

// Edit a post
app.put("/posts/:index", (req, res) => {
  const posts = getPosts();
  posts[req.params.index] = req.body;
  savePosts(posts);
  res.json({ success: true });
});

// Delete a post
app.delete("/posts/:index", (req, res) => {
  const posts = getPosts();
  posts.splice(req.params.index, 1);
  savePosts(posts);
  res.json({ success: true });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
