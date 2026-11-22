// Simple front-end login (demo only: data is stored in the browser's localStorage)
const USERS = "campfix_users", SESSION = "campfix_session";
const getUsers = () => JSON.parse(localStorage.getItem(USERS) || "[]");
const currentUser = () => JSON.parse(localStorage.getItem(SESSION) || "null");

function registerUser(name, email, password) {
  const users = getUsers();
  if (users.some(u => u.email === email)) return "This email is already registered.";
  users.push({ name, email, password });
  localStorage.setItem(USERS, JSON.stringify(users));
  return "";
}
function loginUser(email, password) {
  const u = getUsers().find(u => u.email === email && u.password === password);
  if (!u) return "Wrong email or password.";
  localStorage.setItem(SESSION, JSON.stringify({ name: u.name, email: u.email }));
  return "";
}
function logout() {
  localStorage.removeItem(SESSION);
  location.href = "login.html";
}
// call on pages that need a logged-in user
function requireLogin() {
  if (!currentUser()) location.href = "login.html";
}
