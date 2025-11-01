const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" })); // allow large images

// Simple in-memory storage for now (replace with DB later)
let users = [];
let posts = [];

// Accounts
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  if(users.find(u => u.username === username)){
    return res.status(400).json({ error: "Username exists" });
  }
  users.push({ username, email, password });
  res.json({ success: true });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username===username && u.password===password);
  if(!user) return res.status(400).json({ error: "Invalid credentials" });
  res.json({ success: true, username });
});

// Posts
app.get("/posts", (req,res)=>{
  res.json(posts);
});

app.post("/posts", (req,res)=>{
  const { title, description, user, image } = req.body;
  posts.push({ title, description, user, image });
  res.json({ success:true });
});

app.delete("/posts/:index", (req,res)=>{
  const index = parseInt(req.params.index);
  if(index>=0 && index<posts.length){
    posts.splice(index,1);
    res.json({ success:true });
  } else {
    res.status(400).json({ error: "Invalid index" });
  }
});

const PORT = 3000;
app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}`));
