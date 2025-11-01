// ---------- Simple Local Storage Account System ----------

// Get all accounts
function getAccounts() {
  return JSON.parse(localStorage.getItem("accounts") || "[]");
}

// Save accounts
function saveAccounts(accounts) {
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

// Sign up a new user
function signUp(username, email, password) {
  let accounts = getAccounts();
  if (accounts.find(acc => acc.username === username)) {
    alert("Username already exists!");
    return false;
  }
  accounts.push({ username, email, password });
  saveAccounts(accounts);
  localStorage.setItem("currentUser", username);
  return true;
}

// Login
function login(username, password) {
  let accounts = getAccounts();
  const account = accounts.find(acc => acc.username === username && acc.password === password);
  if (account) {
    localStorage.setItem("currentUser", username);
    return true;
  } else {
    alert("Invalid username or password!");
    return false;
  }
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
}

// Get current user
function getCurrentUser() {
  return localStorage.getItem("currentUser");
}
