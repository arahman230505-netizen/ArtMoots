// --- POSTS DATABASE SYSTEM ---
const postsContainer = document.getElementById("postsContainer");
const postForm = document.getElementById("postForm");
const currentUser = localStorage.getItem("loggedInUser");
const adminUser = "ArtMootsOwner"; // change to your username

let posts = JSON.parse(localStorage.getItem("posts")) || [];

// Update nav to show account or sign in
function updateHeader() {
  const nav = document.getElementById("navLinks");
  if (currentUser) {
    nav.innerHTML = `
      <a href="index.html">Home</a>
      <a href="posts.html">Posts</a>
      <a href="moots.html">Moots</a>
      <a href="help.html">Help</a>
      <span>👤 ${currentUser}</span>
      <a href="#" id="logoutBtn">Logout</a>
    `;
    document.getElementById("logoutBtn").onclick = () => {
      localStorage.removeItem("loggedInUser");
      location.reload();
    };
  }
}
updateHeader();

// Save to storage
function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

// Render posts
function renderPosts() {
  postsContainer.innerHTML = "";
  posts.forEach((p, i) => {
    const post = document.createElement("div");
    post.className = "post-card";
    post.innerHTML = `
      <img src="${p.image}" alt="Post image">
      <p class="post-desc">${p.description}</p>
      <div class="post-actions">
        <button class="like-btn" data-index="${i}">❤️ ${p.likes || 0}</button>
        ${
          currentUser === adminUser || p.user === currentUser
            ? `<button class="delete-btn" data-index="${i}">🗑️ Delete</button>`
            : ""
        }
      </div>
      <small class="post-user">Posted by: ${p.user}</small>
    `;
    postsContainer.appendChild(post);
  });
}

renderPosts();

// Handle new post
postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!currentUser) {
    alert("Please sign in first!");
    return;
  }
  const file = document.getElementById("postImage").files[0];
  if (!file) return alert("Please select an image.");
  const reader = new FileReader();
  reader.onload = function (e) {
    posts.unshift({
      image: e.target.result,
      description: document.getElementById("postDesc").value,
      user: currentUser,
      likes: 0,
      likedUsers: []
    });
    savePosts();
    renderPosts();
    postForm.reset();
  };
  reader.readAsDataURL(file);
});

// Handle like/delete
postsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("like-btn")) {
    const i = e.target.dataset.index;
    const likedUsers = posts[i].likedUsers || [];
    if (likedUsers.includes(currentUser)) return alert("You already liked this!");
    likedUsers.push(currentUser);
    posts[i].likes++;
    posts[i].likedUsers = likedUsers;
    savePosts();
    renderPosts();
  } else if (e.target.classList.contains("delete-btn")) {
    const i = e.target.dataset.index;
    posts.splice(i, 1);
    savePosts();
    renderPosts();
  }
});
