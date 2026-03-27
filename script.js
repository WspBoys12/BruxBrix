let currentUser = null;
const sections = ['games','marketplace','creator','profile'];

function showSection(name){
  sections.forEach(s => document.getElementById(s).classList.add('hidden'));
  document.getElementById(name).classList.remove('hidden');
}

// AUTH
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email,password)
  .then(uc => {
    const user = uc.user;
    db.collection("users").doc(user.uid).set({bux:0,score:0,username:email.split('@')[0]});
    alert("Account created!");
    currentUser = user;
    showProfile();
  }).catch(e => alert(e.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email,password)
  .then(uc => {
    currentUser = uc.user;
    alert("Logged in!");
    showProfile();
  }).catch(e=>alert(e.message));
}

function logout() {
  auth.signOut().then(()=>location.reload());
}

// SHOW PROFILE
function showProfile() {
  if(!currentUser) return;
  db.collection("users").doc(currentUser.uid).get().then(doc=>{
    const data = doc.data();
    document.getElementById("authBox").classList.add('hidden');
    document.getElementById("profileContent").innerHTML = `
      <h3>Welcome, ${data.username}</h3>
      <p>Bux: ${data.bux}</p>
      <p>Score: ${data.score}</p>
      <button onclick="logout()">Logout</button>
    `;
    showSection('profile');
  });
}

// GAME WINDOW
const gameWindow = document.getElementById("gameWindow");
let gameLoopId;
function openGame(game){ 
  gameWindow.classList.remove('hidden'); 
  startDodgeGame(); 
}
function closeGame(){ 
  gameWindow.classList.add('hidden'); 
  cancelAnimationFrame(gameLoopId); 
}
